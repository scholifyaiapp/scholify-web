/*
 * LW-Global Area B — the CISG: application, formation, obligations, remedies and
 * the passing of risk. Plus Incoterms.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * The largest area of the paper, and the one where the distractors are most often
 * the RIGHT REMEDY IN THE WRONG CIRCUMSTANCES: avoidance offered where the breach
 * is not fundamental, specific performance offered where the Convention leaves it
 * to the forum's own law, an Incoterm's risk rule offered as its cost rule. So
 * almost every plan here establishes the threshold condition first — is the breach
 * fundamental, has the additional period expired, which Incoterm group applies —
 * because the remedy cannot be selected until it is.
 *
 * Convention wording is cited by article wherever it is quoted.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const LWG_PLANS_B: ExamPlanMap = {
  /* ── LWG-06 · Sphere of application ──────────────────────────── */

  "LWG-06::when-it-applies": {
    title: "Deciding whether the Convention governs a contract",
    format: "ot",
    marks: 2,
    requirement:
      "The CISG applies to a contract of sale of goods where:\n\nA  Either party has its place of business in a Contracting State\nB  The parties have their places of business in different States, and those States are Contracting States\nC  The goods are shipped across a border, whatever the parties' places of business\nD  The contract is in writing",
    plan: [
      {
        step: "State the test as two conditions, both required",
        detail:
          "Places of business in DIFFERENT States, and those States being Contracting States (Article 1(1)(a)). Internationality plus connection to the Convention — one without the other is not enough.",
      },
      {
        step: "Reject the one-sided version",
        detail:
          "Option A needs only one party in a Contracting State. That is insufficient under 1(1)(a), and it is the most attractive distractor because it feels close to the rule.",
      },
      {
        step: "Reject the shipment test",
        detail:
          "The Convention keys off the parties' PLACES OF BUSINESS, not the movement of goods. Two parties in the same State are outside it even if the goods cross a border en route.",
      },
      {
        step: "Note that the parties can exclude it",
        detail:
          "Article 6 allows the parties to exclude the Convention or derogate from most of its provisions. So even where both conditions are met, an express exclusion displaces it — and commercial contracts often do exactly that.",
      },
    ],
    answer:
      "**B — the parties have their places of business in different States, and those States are Contracting States.**\n\nTwo conditions, both required, under **Article 1(1)(a)**: internationality — places of business in different States — and connection to the Convention, both States being Contracting States. The Convention also applies under 1(1)(b) where the rules of private international law lead to the law of a Contracting State.\n\nOption A needs only one party in a Contracting State, which is not enough. Option C keys off the movement of goods; the Convention keys off **places of business**, so two parties in the same State are outside it even if the goods cross a border.\n\nWriting is not required — **Article 11** provides that a contract of sale need not be concluded in or evidenced by writing.\n\nAnd **Article 6** lets the parties exclude the Convention or derogate from most of its provisions, so an express exclusion displaces it even where both conditions are met.",
    earns: [
      "Requiring both conditions, and knowing Article 6 allows exclusion",
      "Keying off places of business rather than the movement of the goods",
    ],
    loses: ["Accepting one party in a Contracting State as sufficient"],
  },

  "LWG-06::exclusions": {
    title: "Identifying a sale the Convention does not cover",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **excluded** from the CISG?\n\nA  A sale of industrial machinery between businesses in different Contracting States\nB  A sale of goods bought for personal, family or household use\nC  A sale of raw materials for manufacture\nD  A sale of goods to be manufactured to the buyer's specification",
    plan: [
      {
        step: "Recall the exclusions as a list",
        detail:
          "Consumer sales, sales by auction, sales on execution or by authority of law, stocks, shares, negotiable instruments and money, ships, aircraft and hovercraft, and electricity (Article 2).",
      },
      {
        step: "Match the option to the list",
        detail:
          "Goods bought for personal, family or household use is the consumer exclusion. It is the first item in Article 2 and the one examined most often.",
      },
      {
        step: "Confirm the manufacture option is INCLUDED",
        detail:
          "Article 3 treats a contract for goods to be manufactured or produced as a sale, unless the buyer supplies a substantial part of the materials. So D is within the Convention, not outside it.",
      },
      {
        step: "Note what else the Convention does not govern",
        detail:
          "It does not govern the validity of the contract, the effect on property in the goods, or liability for death or personal injury caused by the goods (Articles 4 and 5) — a different kind of exclusion from Article 2.",
      },
    ],
    answer:
      "**B — a sale of goods bought for personal, family or household use.**\n\nThe consumer exclusion is the first item in **Article 2**, which also excludes sales by auction, sales on execution or by authority of law, stocks, shares and negotiable instruments, money, ships, aircraft and hovercraft, and electricity.\n\nOption D is the instructive distractor because it feels like a service rather than a sale. **Article 3** treats a contract for goods to be manufactured or produced as a sale **unless** the buyer supplies a substantial part of the necessary materials — so it is within the Convention.\n\nA second kind of exclusion is worth keeping separate: **Articles 4 and 5** provide that the Convention does not govern the **validity** of the contract, the **effect on property** in the goods, or **liability for death or personal injury**. Those are matters excluded from its subject matter rather than sales excluded from its scope.",
    earns: [
      "Knowing manufacture-to-order is included unless the buyer supplies substantial materials",
      "Keeping the Article 2 exclusions separate from the Article 4 and 5 limits on subject matter",
    ],
    loses: ["Excluding a manufacture contract, which the Convention expressly includes"],
  },

  /* ── LWG-07 · Formation ──────────────────────────────────────── */

  "LWG-07::offer": {
    title: "When an offer can still be withdrawn or revoked",
    format: "ot",
    marks: 2,
    requirement:
      "Under the CISG, an offer may **not** be revoked where:\n\nA  The offeree has begun to consider it\nB  It indicates that it is irrevocable, or the offeree reasonably relied on it as being irrevocable\nC  It was made in writing\nD  More than seven days have passed since it was made",
    plan: [
      {
        step: "Separate withdrawal from revocation",
        detail:
          "WITHDRAWAL reaches the offeree before or at the same time as the offer, so the offer never takes effect (Article 15(2)). REVOCATION comes after the offer has reached the offeree.",
      },
      {
        step: "State the revocation rule and its limits",
        detail:
          "An offer may be revoked if the revocation reaches the offeree before it has dispatched an acceptance — but not where the offer indicates it is irrevocable, or the offeree reasonably relied on its being irrevocable (Article 16).",
      },
      {
        step: "Identify the two moments that matter",
        detail:
          "Dispatch of acceptance ends the power to revoke. Receipt of acceptance forms the contract. Two different moments, and the gap between them is where the rule operates.",
      },
      {
        step: "Reject the irrelevant conditions",
        detail:
          "Merely considering the offer changes nothing, writing does not make an offer irrevocable, and no fixed period applies. Each option supplies a condition the Convention does not use.",
      },
    ],
    answer:
      "**B — it indicates that it is irrevocable, or the offeree reasonably relied on it as being irrevocable.**\n\nUnder **Article 16**, an offer may be revoked if the revocation reaches the offeree before it has dispatched an acceptance — subject to exactly those two exceptions.\n\nTwo distinctions carry the marks. **Withdrawal** under Article 15(2) reaches the offeree before or at the same time as the offer, so the offer never takes effect at all; **revocation** comes afterwards. And two separate moments matter: **dispatch** of acceptance ends the power to revoke, while **receipt** of acceptance forms the contract (Article 18(2)) — the gap between them is where the rule operates.\n\nOptions A, C and D each supply a condition the Convention does not use: considering an offer changes nothing, writing does not make it irrevocable, and no fixed period applies.",
    earns: [
      "Separating withdrawal from revocation",
      "Knowing dispatch of acceptance ends revocability while receipt forms the contract",
    ],
    loses: ["Treating a written offer as irrevocable"],
  },

  "LWG-07::acceptance": {
    title: "Whether a reply with changed terms is an acceptance",
    format: "ot",
    marks: 2,
    requirement:
      "A buyer replies to an offer accepting it but adding a term requiring delivery two weeks earlier. Under the CISG this reply is:\n\nA  An acceptance forming a contract on the seller's terms\nB  A counter-offer, because the added term materially alters the offer\nC  An acceptance, since additional terms are always ignored\nD  Of no legal effect",
    plan: [
      {
        step: "State the general rule and its qualification",
        detail:
          "A reply purporting to accept but containing additions or modifications is a rejection and counter-offer (Article 19(1)) — unless the changes do not MATERIALLY alter the terms, in which case it can operate as an acceptance (19(2)).",
      },
      {
        step: "Check whether the change is material",
        detail:
          "Article 19(3) names the material matters: price, payment, quality and quantity of the goods, place and TIME of delivery, extent of liability, and settlement of disputes. Delivery timing is expressly on that list.",
      },
      {
        step: "Apply the rule to the facts",
        detail:
          "Changing delivery by two weeks alters the time of delivery, which is material. So the reply is a counter-offer, and no contract exists until the seller accepts it.",
      },
      {
        step: "Note the 19(2) mechanism, since a variant question uses it",
        detail:
          "Where the changes are not material, the reply is an acceptance and the modified terms become part of the contract — unless the offeror objects without undue delay.",
      },
    ],
    answer:
      "**B — a counter-offer, because the added term materially alters the offer.**\n\n**Article 19(1)** makes a reply purporting to accept but containing additions or modifications a rejection and a counter-offer. **Article 19(2)** qualifies this: where the changes do not **materially** alter the terms, the reply operates as an acceptance unless the offeror objects without undue delay, and the modified terms become part of the contract.\n\n**Article 19(3)** lists what counts as material: price, payment, quality and quantity of the goods, place and **time of delivery**, extent of liability, and settlement of disputes. Delivery timing is expressly there, so a two-week change is material and no contract exists until the seller accepts.\n\nOption C states that additional terms are always ignored, which reverses 19(1). The practical consequence is that a purchase order adding terms to a quotation usually forms no contract at all — the seller's next act decides it.",
    earns: [
      "Checking the change against the Article 19(3) list rather than judging materiality by feel",
      "Knowing the 19(2) route where changes are immaterial",
    ],
    loses: ["Treating any reply beginning \"we accept\" as an acceptance"],
  },

  "LWG-07::form": {
    title: "Whether writing is required",
    format: "ot",
    marks: 1,
    requirement:
      "Under the CISG, a contract of sale:\n\nA  Must be in writing to be valid\nB  Need not be concluded in or evidenced by writing\nC  Must be signed by both parties\nD  Must be registered with a public authority",
    plan: [
      {
        step: "Recall the rule directly",
        detail:
          "Article 11: a contract of sale need not be concluded in or evidenced by writing and is not subject to any other requirement as to form. It may be proved by any means, including witnesses.",
      },
      {
        step: "Note why the Convention takes this position",
        detail:
          "Commercial practice concludes contracts by exchange of messages, over the telephone and by conduct. A writing requirement would invalidate a great deal of ordinary international trade.",
      },
      {
        step: "Keep the practical point separate from the legal one",
        detail:
          "Writing is not required for VALIDITY but remains essential for PROOF. A contract nobody can evidence is of limited use, which is why commercial parties document everything regardless.",
      },
    ],
    answer:
      "**B — need not be concluded in or evidenced by writing.**\n\n**Article 11** provides exactly this, and adds that a contract is not subject to any other requirement as to form and may be proved by any means, including witnesses.\n\nThe Convention takes that position because commercial practice concludes contracts by exchange of messages, over the telephone and by conduct — a writing requirement would invalidate a great deal of ordinary international trade.\n\nKeep the legal point separate from the practical one: writing is not required for **validity** but remains essential for **proof**, which is why commercial parties document everything regardless of what the Convention permits.\n\nNote also that a Contracting State may declare under **Article 96** that it requires writing, and the parties may themselves agree that modification requires writing (Article 29(2)).",
    earns: ["Separating validity from proof, and knowing the Article 96 declaration exists"],
    loses: ["Assuming an international sale must be in writing"],
  },

  /* ── LWG-08 · Incoterms ──────────────────────────────────────── */

  "LWG-08::what-they-are": {
    title: "What Incoterms do, and what they leave alone",
    format: "ot",
    marks: 2,
    requirement:
      "Incoterms determine:\n\nA  The price to be paid for the goods\nB  The allocation of delivery obligations, cost and risk between seller and buyer\nC  When title to the goods passes\nD  Which state's law governs the contract",
    plan: [
      {
        step: "State what an Incoterm allocates",
        detail:
          "Delivery obligations, the point at which risk passes, and which party bears which costs — including carriage, insurance, export and import formalities.",
      },
      {
        step: "State what it does NOT do",
        detail:
          "It does not fix the price, does not determine when TITLE passes, and does not choose the governing law. Each omission is a separate option in this question.",
      },
      {
        step: "Give title particular attention",
        detail:
          "Risk and title are different things and can pass at different moments. Incoterms deal with risk; title is a matter for the applicable law, and the CISG itself does not govern it either (Article 4).",
      },
      {
        step: "Recall how Incoterms take effect",
        detail:
          "They are ICC rules, not law. They bind because the parties incorporate them into the contract, which is why the contract should name the term AND the version, such as FOB Shanghai Incoterms 2020.",
      },
    ],
    answer:
      "**B — the allocation of delivery obligations, cost and risk between seller and buyer.**\n\nAn Incoterm allocates three things: where and how delivery is made, the point at which **risk** passes, and which party bears which **costs** — carriage, insurance, export and import formalities.\n\nIt does not fix the price, does not choose the governing law, and — most importantly — does not determine when **title** passes. Risk and title are separate and can pass at different moments; title is a matter for the applicable law, and the CISG does not govern it either (Article 4).\n\nIncoterms are **ICC rules, not law**. They bind because the parties incorporate them, which is why a contract should name the term and the version: *FOB Shanghai Incoterms 2020*. Naming a term without a version invites argument about which edition applies.",
    earns: [
      "Keeping risk and title apart, and knowing neither Incoterms nor the CISG governs title",
      "Knowing Incoterms bind by incorporation and should be cited with their version",
    ],
    loses: ["Assuming an Incoterm settles when ownership passes"],
  },

  "LWG-08::the-four-groups": {
    title: "Reading an Incoterm from its group",
    format: "ot",
    marks: 2,
    requirement:
      "Under **FOB** (Free On Board), risk passes to the buyer when the goods:\n\nA  Leave the seller's premises\nB  Are placed on board the vessel at the named port of shipment\nC  Arrive at the named port of destination\nD  Are cleared through import customs",
    plan: [
      {
        step: "Identify the group from the first letter",
        detail:
          "E terms: goods made available at the seller's premises. F terms: seller delivers to a carrier, buyer arranges main carriage. C terms: seller arranges carriage but risk passes on shipment. D terms: seller bears risk to destination.",
      },
      {
        step: "Place FOB in its group",
        detail:
          "F term, so the buyer arranges and pays for the main carriage and risk passes early. Specifically, on board the vessel at the named port of shipment.",
      },
      {
        step: "Note the trap that runs through every C term",
        detail:
          "Under CIF and CFR the seller PAYS for carriage to destination but risk still passes on shipment. Cost and risk part company, and that split is the single most examined point in the topic.",
      },
      {
        step: "Reject the D-term and E-term answers",
        detail:
          "Arrival at destination is a D term such as DAP or DDP. Leaving the seller's premises is closer to EXW. Neither describes FOB.",
      },
    ],
    answer:
      "**B — are placed on board the vessel at the named port of shipment.**\n\nThe first letter gives the group. **E** terms: goods made available at the seller's premises (EXW). **F** terms: seller delivers to a carrier and the buyer arranges main carriage (FCA, FAS, FOB). **C** terms: seller arranges carriage but risk passes on shipment (CFR, CIF, CPT, CIP). **D** terms: seller bears risk to destination (DAP, DPU, DDP).\n\nFOB is an F term, so risk passes on board at the port of shipment.\n\nThe point examined most often is the **C group split**: under CIF the seller pays for carriage and insurance to destination, yet **risk passes on shipment**. So a buyer under CIF bears the risk of goods it has not paid the freight for — which is exactly why the seller must procure insurance for the buyer's benefit.\n\nEXW places the least obligation on the seller and DDP the most.",
    earns: [
      "Using the first letter to place the term, then reading risk from the group",
      "Knowing that under C terms cost and risk pass at different points",
    ],
    loses: ["Assuming that whoever pays for carriage bears the risk during it"],
  },

  /* ── LWG-09 · The seller's obligations ───────────────────────── */

  "LWG-09::delivery": {
    title: "Where the seller must deliver where the contract is silent",
    format: "ot",
    marks: 2,
    requirement:
      "A contract governed by the CISG does not specify a place of delivery and does not involve carriage of the goods. The seller must place the goods at the buyer's disposal:\n\nA  At the buyer's place of business\nB  At the seller's place of business\nC  At any port agreed between the carriers\nD  At the buyer's customer's premises",
    plan: [
      {
        step: "Take the default rules in the order the Convention sets them",
        detail:
          "Article 31: if carriage is involved, hand the goods to the first carrier. If the goods are at a particular place known to both, place them at the buyer's disposal there. Otherwise, at the seller's place of business.",
      },
      {
        step: "Establish which limb of Article 31 applies",
        detail:
          "The stem excludes carriage and names no particular place, so the residual limb applies — the seller's place of business at the time the contract was concluded.",
      },
      {
        step: "See why the default favours the seller",
        detail:
          "In the absence of agreement the obligation is the minimum one. Requiring delivery to the buyer's premises would impose carriage the parties never agreed, so the residual rule is collection.",
      },
      {
        step: "Note the related timing default",
        detail:
          "Where no date is fixed, delivery is within a reasonable time after conclusion of the contract (Article 33(c)). The place and the time defaults are examined together.",
      },
    ],
    answer:
      "**B — at the seller's place of business.**\n\n**Article 31** sets three limbs in order. Where the contract **involves carriage**, the seller hands the goods to the first carrier. Where the goods are at a **particular place** known to both parties, the seller places them at the buyer's disposal there. **Otherwise**, at the seller's place of business when the contract was concluded.\n\nThe stem excludes carriage and names no particular place, so the residual limb applies.\n\nThe default favours the seller because in the absence of agreement the obligation is the **minimum** one — requiring delivery to the buyer's premises would impose carriage the parties never agreed to.\n\nThe timing default pairs with it: where no date is fixed, delivery is within a **reasonable time** after conclusion (Article 33(c)). And the seller must hand over any documents relating to the goods at the time and place the contract requires (Article 34).",
    earns: [
      "Working through the three limbs of Article 31 in order",
      "Knowing the timing default in Article 33(c)",
    ],
    loses: ["Assuming the seller must deliver to the buyer where the contract is silent"],
  },

  "LWG-09::conformity": {
    title: "When goods conform, and how long the buyer has to say they do not",
    format: "ot",
    marks: 2,
    requirement:
      "Under the CISG, a buyer loses the right to rely on a lack of conformity if it:\n\nA  Does not give notice specifying the nature of the lack of conformity within a reasonable time after discovering it or when it ought to have discovered it\nB  Pays for the goods\nC  Resells the goods to a third party\nD  Fails to give notice within seven days of delivery",
    plan: [
      {
        step: "State the conformity standard first",
        detail:
          "Goods must be fit for their ordinary purpose, fit for any particular purpose made known to the seller, possess the qualities of a sample or model, and be packaged as usual (Article 35).",
      },
      {
        step: "State the notice rule as the Convention words it",
        detail:
          "The buyer must give notice specifying the nature of the lack of conformity within a reasonable time after it discovered it or ought to have discovered it (Article 39(1)). Both the specificity and the reasonable time matter.",
      },
      {
        step: "Reject the fixed period",
        detail:
          "Option D supplies seven days. The Convention uses a reasonable time, which depends on the goods — perishables give days, machinery may give longer.",
      },
      {
        step: "Add the two-year long stop",
        detail:
          "Article 39(2) bars notice given more than two years after the goods were actually handed over, unless a longer contractual guarantee applies. It runs regardless of when the defect was discoverable.",
      },
    ],
    answer:
      "**A — does not give notice specifying the nature of the lack of conformity within a reasonable time after discovering it or when it ought to have discovered it.**\n\n**Article 39(1)** words it that way, and both elements bite: the notice must **specify the nature** of the defect, and it must come within a **reasonable time**. A vague complaint that the goods are unsatisfactory may not suffice.\n\nOption D supplies a fixed seven days; the Convention uses a reasonable time, which depends on the goods — days for perishables, longer for machinery whose defect emerges in use. The buyer is also required to examine the goods within as short a period as is practicable (Article 38).\n\n**Article 39(2)** adds a two-year long stop from actual handing over, unless a longer contractual guarantee applies, and it runs regardless of discoverability.\n\nPaying and reselling do not by themselves waive the right — though they may bear on whether the buyer had discovered the defect.",
    earns: [
      "Quoting both requirements — specifying the nature, and within a reasonable time",
      "Knowing the two-year long stop in Article 39(2)",
    ],
    loses: ["Supplying a fixed notice period the Convention does not use"],
  },

  /* ── LWG-10 · The buyer's remedies ───────────────────────────── */

  "LWG-10::fundamental-breach": {
    title: "The threshold that unlocks the strongest remedies",
    format: "ot",
    marks: 2,
    requirement:
      "A breach is fundamental under the CISG where it results in such detriment to the other party as substantially to deprive it of:\n\nA  Any profit on the transaction\nB  What it was entitled to expect under the contract, unless the party in breach did not foresee and a reasonable person would not have foreseen that result\nC  The goods themselves\nD  Its right to give notice",
    plan: [
      {
        step: "State the definition and note that it has two limbs",
        detail:
          "Article 25: substantial deprivation of what the party was entitled to expect under the contract, PLUS a foreseeability qualification — unless the party in breach did not foresee, and a reasonable person would not have foreseen, that result.",
      },
      {
        step: "Understand why the threshold matters so much",
        detail:
          "Fundamental breach is the gateway to AVOIDANCE. Without it the buyer has damages, price reduction, repair and substitute goods, but cannot walk away from the contract.",
      },
      {
        step: "Reject the profit-based test",
        detail:
          "Loss of profit is not the test. A breach may destroy the profit and not be fundamental, or be fundamental with the profit intact — the test is deprivation of contractual expectation.",
      },
      {
        step: "Note the alternative route to avoidance",
        detail:
          "Where a seller fails to deliver, the buyer may fix an ADDITIONAL PERIOD (Nachfrist) and avoid if delivery does not follow within it (Article 49(1)(b)) — avoidance without having to prove fundamentality.",
      },
    ],
    answer:
      "**B — what it was entitled to expect under the contract, unless the party in breach did not foresee and a reasonable person would not have foreseen that result.**\n\n**Article 25** has both limbs, and the foreseeability qualification is the half candidates omit.\n\nThe threshold matters because fundamental breach is the gateway to **avoidance**. Below it the buyer still has damages, price reduction, repair and substitute goods — but cannot walk away from the contract.\n\nLoss of profit is not the test: a breach may destroy the profit without being fundamental, or be fundamental with the profit intact. The test is deprivation of **contractual expectation**.\n\nThe second route to avoidance is worth holding. Where the seller fails to deliver, the buyer may fix an **additional period** of reasonable length — the Nachfrist procedure — and avoid if delivery does not follow within it (Article 49(1)(b)), without needing to establish fundamentality at all.",
    earns: [
      "Including the foreseeability limb of Article 25",
      "Naming the additional period as a second route to avoidance",
    ],
    loses: ["Testing fundamentality by loss of profit"],
  },

  "LWG-10::performance-and-cure": {
    title: "Which remedy is available for a non-fundamental breach",
    format: "ot",
    marks: 2,
    requirement:
      "Goods delivered are defective but the breach is **not** fundamental. Which remedy is **not** available to the buyer?\n\nA  Requiring the seller to repair the goods\nB  Claiming damages\nC  Reducing the price in the proportion the value of the goods delivered bears to the value conforming goods would have had\nD  Avoiding the contract",
    plan: [
      {
        step: "Sort the remedies by whether they need fundamentality",
        detail:
          "Damages, price reduction and requiring repair are all available for any breach. AVOIDANCE requires either fundamental breach or an expired additional period.",
      },
      {
        step: "Read the stem's key fact",
        detail:
          "The breach is not fundamental, and nothing is said about an additional period. So avoidance is unavailable, and every other option remains open.",
      },
      {
        step: "State the price reduction formula precisely",
        detail:
          "Article 50: reduction in the same PROPORTION as the value the goods actually delivered had at the time of delivery bears to the value conforming goods would have had. Proportionate, not the cost of repair.",
      },
      {
        step: "Note the limit on requiring substitute goods",
        detail:
          "Substitute goods may be required only where the lack of conformity IS a fundamental breach (Article 46(2)), whereas repair may be required unless it is unreasonable (46(3)). Two different thresholds.",
      },
    ],
    answer:
      "**D — avoiding the contract.**\n\nAvoidance requires either a **fundamental breach** or an expired **additional period** (Article 49). Neither is present, so the buyer cannot walk away.\n\nEverything else remains available. **Damages** for any breach (Article 45). **Price reduction** under Article 50, in the same proportion as the value the goods actually delivered had at the time of delivery bears to the value conforming goods would have had — a proportionate reduction, not the cost of repair. And **repair** may be required unless it would be unreasonable in the circumstances (Article 46(3)).\n\nThe threshold for **substitute goods** is higher: it requires the lack of conformity to amount to a fundamental breach (Article 46(2)). Repair and replacement therefore sit at different levels, which is a distinction the paper tests directly.\n\nNote also that specific performance is subject to Article 28 — a court need not order it if it would not do so under its own law for similar contracts.",
    earns: [
      "Sorting remedies by whether fundamentality is required",
      "Knowing repair and substitute goods have different thresholds",
    ],
    loses: ["Offering avoidance for any defect, which is what the fundamentality threshold prevents"],
  },

  "LWG-10::avoidance-and-reduction": {
    title: "The consequences of avoidance",
    format: "ot",
    marks: 2,
    requirement:
      "Where a contract is validly avoided under the CISG:\n\nA  Neither party has any further claim of any kind\nB  Both parties are released from their obligations, but a claim for damages survives\nC  Only the buyer is released\nD  The contract is treated as never having existed for all purposes",
    plan: [
      {
        step: "State the two effects of avoidance",
        detail:
          "Article 81: avoidance releases both parties from their obligations, subject to any damages due, and does not affect any contract provision on dispute settlement or the consequences of avoidance.",
      },
      {
        step: "Note that damages survive",
        detail:
          "This is what option A gets wrong. Avoidance ends performance obligations; it does not extinguish the right to be compensated for the breach that justified it.",
      },
      {
        step: "Note what else survives",
        detail:
          "Dispute resolution provisions survive — otherwise avoiding the contract would destroy the arbitration clause needed to enforce the damages claim, which would be self-defeating.",
      },
      {
        step: "Handle restitution",
        detail:
          "A party that has performed may claim restitution of what it supplied (Article 81(2)), and the buyer must generally be able to return the goods substantially in the condition received (Article 82).",
      },
    ],
    answer:
      "**B — both parties are released from their obligations, but a claim for damages survives.**\n\n**Article 81** provides that avoidance releases both parties from their obligations under the contract, **subject to any damages which may be due**, and expressly does not affect any contract provision on **dispute settlement** or on the consequences of avoidance.\n\nBoth survivals matter. Damages survive because avoidance ends performance, not the right to be compensated for the breach that justified it. Dispute resolution provisions survive because otherwise avoiding the contract would destroy the arbitration clause needed to enforce the damages claim — a self-defeating result.\n\nOption D says the contract is treated as never having existed for all purposes, which those survivals contradict.\n\n**Restitution** follows: a party that has performed may claim back what it supplied (Article 81(2)), and the buyer generally loses the right to avoid if it cannot return the goods substantially in the condition in which it received them (Article 82).",
    earns: [
      "Knowing damages and dispute resolution provisions both survive avoidance",
      "Naming the restitution limit in Article 82",
    ],
    loses: ["Treating avoidance as extinguishing every claim between the parties"],
  },

  /* ── LWG-11 · The buyer's obligations and seller's remedies ──── */

  "LWG-11::buyers-obligations": {
    title: "What the buyer must do under the Convention",
    format: "ot",
    marks: 1,
    requirement:
      "Under the CISG, the buyer's obligations are to:\n\nA  Pay the price and take delivery of the goods\nB  Pay the price only\nC  Inspect the goods and pay the price\nD  Arrange carriage and insurance",
    plan: [
      {
        step: "Recall the two obligations",
        detail:
          "Article 53: the buyer must pay the price for the goods and take delivery of them as required by the contract and the Convention. Two obligations, stated together.",
      },
      {
        step: "Distinguish an obligation from a burden",
        detail:
          "Examining the goods (Article 38) is something the buyer must do to PRESERVE its remedies, not an obligation owed to the seller. Failing to examine costs the buyer its rights; it is not a breach.",
      },
      {
        step: "Place carriage and insurance correctly",
        detail:
          "Who arranges carriage depends on the Incoterm agreed, not on the Convention. It is a contractual allocation rather than a Convention obligation.",
      },
    ],
    answer:
      "**A — pay the price and take delivery of the goods.**\n\n**Article 53** states both: the buyer must pay the price and take delivery as required by the contract and the Convention.\n\nOption C is the instructive distractor. Examining the goods under **Article 38** is something the buyer must do to **preserve its remedies** — it is a burden on the buyer, not an obligation owed to the seller. Failing to examine costs the buyer its rights under Article 39; it is not a breach the seller can sue on.\n\nCarriage and insurance depend on the **Incoterm** the parties agreed, not on the Convention.\n\nThe payment obligation carries its own defaults: absent agreement, payment is due when the seller places the goods or documents at the buyer's disposal (Article 58), and no request or formality is needed for it to fall due (Article 59).",
    earns: ["Distinguishing an obligation owed to the seller from a burden that preserves the buyer's own rights"],
    loses: ["Listing examination as an obligation, which confuses whose interest it protects"],
  },

  "LWG-11::sellers-remedies": {
    title: "The seller's remedy where the buyer will not pay",
    format: "ot",
    marks: 2,
    requirement:
      "A buyer has failed to pay. The seller wishes to avoid the contract but the failure is not yet a fundamental breach. The seller may:\n\nA  Avoid immediately in any event\nB  Fix an additional period of reasonable length for payment, and avoid if the buyer does not pay within it\nC  Only claim damages, never avoid\nD  Resell the goods without notice and keep the full proceeds",
    plan: [
      {
        step: "Note the symmetry with the buyer's remedies",
        detail:
          "The seller's remedies mirror the buyer's: require performance, fix an additional period, avoid for fundamental breach, and claim damages. Recognising the symmetry halves what has to be remembered.",
      },
      {
        step: "Identify the additional period route",
        detail:
          "Article 63 lets the seller fix an additional period of reasonable length. Article 64(1)(b) then permits avoidance if the buyer does not pay or take delivery within it — avoidance without proving fundamentality.",
      },
      {
        step: "Reject avoidance without a trigger",
        detail:
          "Option A allows avoidance regardless. Avoidance always needs either fundamental breach or an expired additional period; there is no free-standing right to walk away.",
      },
      {
        step: "Reject the self-help option",
        detail:
          "The seller cannot simply resell and keep everything. Damages are limited to the loss suffered (Article 74), and a seller who resells at a profit has not suffered that loss.",
      },
    ],
    answer:
      "**B — fix an additional period of reasonable length for payment, and avoid if the buyer does not pay within it.**\n\nThe seller's remedies mirror the buyer's, which is the most useful thing to know about them. **Article 62**: require performance. **Article 63**: fix an additional period of reasonable length. **Article 64(1)(b)**: avoid if the buyer does not pay or take delivery within that period — avoidance without having to establish fundamental breach. **Article 61**: damages.\n\nOption A allows avoidance with no trigger; there is no free-standing right to walk away. Option C denies avoidance entirely, which Article 64 contradicts.\n\nOption D is the self-help answer. The seller cannot resell and keep the whole proceeds: damages are limited to the loss actually suffered (Article 74), and a seller who resells at a profit has suffered none. Article 88 permits sale of goods the seller is bound to preserve, with the proceeds accounted for.",
    earns: [
      "Using the symmetry with the buyer's remedies",
      "Knowing avoidance always needs a trigger — fundamentality or an expired period",
    ],
    loses: ["Allowing the seller to avoid or to resell without any trigger or accounting"],
  },

  /* ── LWG-12 · Provisions common to both parties ──────────────── */

  "LWG-12::anticipatory-and-instalments": {
    title: "Suspending performance where the other side clearly will not perform",
    format: "ot",
    marks: 2,
    requirement:
      "Under the CISG, a party may suspend performance of its own obligations where:\n\nA  It becomes apparent, after conclusion of the contract, that the other party will not perform a substantial part of its obligations\nB  It changes its mind about the contract\nC  It finds a better price elsewhere\nD  Never — obligations must always be performed",
    plan: [
      {
        step: "State the suspension right and its condition",
        detail:
          "Article 71: a party may suspend performance if, after the conclusion of the contract, it becomes apparent that the other will not perform a substantial part of its obligations. The trigger is objective, not a change of mind.",
      },
      {
        step: "Note the procedural duty attached to it",
        detail:
          "A party suspending must give immediate notice, and must continue with performance if the other provides adequate assurance of its performance. Suspension is provisional, not a way out.",
      },
      {
        step: "Distinguish suspension from avoidance for anticipatory breach",
        detail:
          "Suspension needs a substantial part; AVOIDANCE for anticipatory breach needs it to be clear that a FUNDAMENTAL breach will be committed (Article 72), and normally reasonable notice. Two thresholds.",
      },
      {
        step: "Reject the commercial-convenience options",
        detail:
          "Changing one's mind or finding a better price are not grounds for anything. Both describe wanting out of the contract, which is the opposite of a legal justification.",
      },
    ],
    answer:
      "**A — it becomes apparent, after conclusion of the contract, that the other party will not perform a substantial part of its obligations.**\n\n**Article 71** gives that right, and attaches duties to it: the suspending party must give **immediate notice**, and must **continue** performance if the other provides adequate assurance. Suspension is provisional protection, not an exit.\n\nThe threshold distinction carries the marks. **Suspension** needs a substantial part of the obligations to be at risk. **Avoidance for anticipatory breach** under Article 72 needs it to be **clear** that a **fundamental** breach will be committed, and normally requires reasonable notice so the other party can provide assurance.\n\nFor **instalment** contracts, Article 73 allows avoidance of the affected instalment for a fundamental breach as to that instalment, and of the future if there are good grounds to conclude a fundamental breach will occur.\n\nOptions B and C describe wanting out of the contract, which is not a ground for anything.",
    earns: [
      "Separating suspension (substantial part) from avoidance (clear fundamental breach)",
      "Naming the notice and adequate-assurance duties",
    ],
    loses: ["Treating a commercial change of heart as a legal ground to suspend"],
  },

  "LWG-12::damages": {
    title: "How damages are measured and what limits them",
    format: "ot",
    marks: 2,
    requirement:
      "Damages under the CISG consist of a sum equal to the loss, including loss of profit, suffered as a consequence of the breach — but limited to loss which:\n\nA  Is certified by an independent expert\nB  The party in breach foresaw or ought to have foreseen at the time of conclusion of the contract\nC  Does not exceed the contract price\nD  Arises within twelve months of the breach",
    plan: [
      {
        step: "State the measure and then the limit",
        detail:
          "Article 74: damages equal the loss, including loss of profit, suffered as a consequence of the breach — limited to loss the party in breach foresaw or ought to have foreseen at the TIME OF CONCLUSION, in the light of the facts it then knew.",
      },
      {
        step: "Fix the moment foreseeability is judged",
        detail:
          "At conclusion of the contract, not at breach. So a loss the breaching party could not have anticipated when it contracted is not recoverable however real it is.",
      },
      {
        step: "Add the mitigation duty",
        detail:
          "Article 77: a party relying on breach must take reasonable measures to mitigate. Failing to do so lets the other side claim a reduction in the damages — a limit as important as foreseeability.",
      },
      {
        step: "Reject the arbitrary caps",
        detail:
          "Nothing limits damages to the contract price or to a twelve-month window, and no expert certificate is required. Each option supplies a limit the Convention does not use.",
      },
    ],
    answer:
      "**B — the party in breach foresaw or ought to have foreseen at the time of conclusion of the contract.**\n\n**Article 74** measures damages as the loss, including **loss of profit**, suffered as a consequence of the breach, limited to loss the party in breach foresaw or ought to have foreseen **at the time of conclusion of the contract**, in the light of the facts it then knew.\n\nThe moment matters: foreseeability is judged at **conclusion**, not at breach. A loss the breaching party could not have anticipated when it contracted is irrecoverable however real — which is why a buyer with an unusually valuable sub-sale should tell the seller about it before contracting.\n\n**Article 77** adds the mitigation duty: a party relying on breach must take reasonable measures to mitigate, and failing to do so entitles the other to claim a reduction.\n\nWhere the contract is avoided, Articles 75 and 76 give concrete measures — the difference between the contract price and the substitute transaction, or the current price.",
    earns: [
      "Fixing foreseeability at the time of conclusion",
      "Naming the mitigation duty as the second limit",
    ],
    loses: ["Supplying an arbitrary cap the Convention does not impose"],
  },

  "LWG-12::exemption-avoidance-preservation": {
    title: "When an impediment exempts a party from liability",
    format: "ot",
    marks: 2,
    requirement:
      "Under Article 79 of the CISG, a party is exempt from liability for failure to perform where the failure was due to an impediment:\n\nA  That made performance less profitable\nB  Beyond its control, which it could not reasonably have been expected to take into account, avoid or overcome\nC  Caused by its own supplier's default, in every case\nD  Of any kind, provided notice is given",
    plan: [
      {
        step: "State the three elements, all required",
        detail:
          "Beyond the party's control; not something it could reasonably have been expected to take into account at conclusion; and one it could not reasonably avoid or overcome. All three must hold.",
      },
      {
        step: "Reject the hardship reading",
        detail:
          "Performance becoming less profitable, or more expensive, is not an impediment. Commercial risk is what the contract allocates, and the exemption is not a hardship clause.",
      },
      {
        step: "Handle the supplier default carefully",
        detail:
          "Article 79(2) allows exemption for a third party's failure only if the party would be exempt under 79(1) AND the third party would also be exempt. So a supplier's default rarely exempts — option C's \"in every case\" is what makes it wrong.",
      },
      {
        step: "Note what the exemption does and does not do",
        detail:
          "It exempts from DAMAGES only. The other party retains its other remedies, including avoidance, and the exemption lasts only while the impediment does. Notice must also be given.",
      },
    ],
    answer:
      "**B — beyond its control, which it could not reasonably have been expected to take into account, avoid or overcome.**\n\n**Article 79(1)** requires all three elements: beyond the party's control, not reasonably to have been taken into account at conclusion, and not reasonably avoidable or surmountable.\n\nOption A is the hardship reading, and it fails. Performance becoming less profitable or more expensive is **commercial risk**, which is exactly what the contract allocates — the exemption is not a hardship clause.\n\nOption C overstates **Article 79(2)**, which exempts for a third party's failure only if the party itself would be exempt under 79(1) **and** the third party would also be exempt. A supplier's default therefore rarely exempts, and \"in every case\" is what makes the option wrong.\n\nTwo limits complete it. The exemption is from **damages only** — the other party keeps its other remedies, including avoidance — and it lasts only while the impediment does. **Notice** of the impediment and its effect must be given (79(4)).",
    earns: [
      "Requiring all three elements, and knowing the exemption covers damages only",
      "Reading Article 79(2) as a double condition rather than a general excuse",
    ],
    loses: ["Treating increased cost or reduced profit as an exempting impediment"],
  },

  /* ── LWG-13 · The passing of risk ────────────────────────────── */

  "LWG-13::consequence": {
    title: "What passing of risk actually means for the buyer",
    format: "ot",
    marks: 2,
    requirement:
      "Goods are lost at sea after risk has passed to the buyer, through no fault of either party. The buyer:\n\nA  Need not pay the price\nB  Must pay the price\nC  May avoid the contract for fundamental breach\nD  May claim damages from the seller",
    plan: [
      {
        step: "State the consequence of risk passing",
        detail:
          "Article 66: loss of or damage to the goods after risk has passed does not discharge the buyer from its obligation to pay, unless the loss is due to an act or omission of the seller.",
      },
      {
        step: "Apply it to the facts",
        detail:
          "The stem says the loss was through no fault of either party and risk had passed. So the buyer must pay for goods it will never receive — which is precisely what risk allocation means.",
      },
      {
        step: "Reject the remedies against the seller",
        detail:
          "There is no breach by the seller, so there is nothing to avoid and nothing to claim damages for. Options C and D both presuppose a breach that the facts exclude.",
      },
      {
        step: "Name why this makes insurance non-negotiable",
        detail:
          "Because the buyer bears the loss and still owes the price, whoever holds the risk must be insured. This is the commercial reason the Incoterm chosen matters as much as the price.",
      },
    ],
    answer:
      "**B — must pay the price.**\n\n**Article 66** provides that loss of or damage to the goods after risk has passed does not discharge the buyer from its obligation to pay, unless the loss is due to an act or omission of the seller.\n\nThat is what risk allocation means, and it is a harsher result than candidates expect: the buyer pays for goods it will never receive.\n\nOptions C and D both presuppose a breach by the seller, which the facts exclude — the loss was through no one's fault.\n\nThe commercial consequence is why the topic matters: whoever bears the risk must be **insured** for it. That is the practical reason the Incoterm chosen matters as much as the price, and why under CIF the seller must procure insurance **for the buyer's benefit** even though the seller no longer bears the risk after shipment.",
    earns: [
      "Stating the Article 66 consequence plainly, including that it survives total loss",
      "Connecting risk allocation to the insurance obligation",
    ],
    loses: ["Assuming the buyer need not pay for goods it never received"],
  },

  "LWG-13::the-rules": {
    title: "Identifying the moment risk passes",
    format: "ot",
    marks: 2,
    requirement:
      "Where a contract of sale involves carriage of the goods and the seller is not bound to hand them over at a particular place, risk passes to the buyer when the goods are:\n\nA  Handed over to the first carrier for transmission to the buyer\nB  Delivered to the buyer's premises\nC  Paid for\nD  Cleared through export customs",
    plan: [
      {
        step: "Take the three situations the Convention covers",
        detail:
          "Carriage involved (Article 67), goods sold in transit (Article 68), and all other cases (Article 69). Identify which one the stem describes before selecting a moment.",
      },
      {
        step: "Apply the carriage rule",
        detail:
          "Article 67(1): where carriage is involved and the seller is not bound to hand the goods over at a particular place, risk passes when they are handed to the FIRST carrier for transmission to the buyer.",
      },
      {
        step: "Note what does NOT affect the passing of risk",
        detail:
          "The seller's retention of documents controlling disposition of the goods does not affect the passage of risk (Article 67(1)). Payment does not either — which disposes of option C.",
      },
      {
        step: "Add the identification requirement",
        detail:
          "Risk does not pass until the goods are clearly IDENTIFIED to the contract, by markings, shipping documents, notice to the buyer or otherwise (Article 67(2)). Unascertained goods in a bulk cargo are the standard illustration.",
      },
    ],
    answer:
      "**A — handed over to the first carrier for transmission to the buyer.**\n\n**Article 67(1)** applies where carriage is involved and the seller is not bound to hand the goods over at a particular place: risk passes on handing them to the **first** carrier. \"First\" matters where several carriers are used in sequence.\n\nTwo qualifications complete the rule. The seller's **retention of documents** controlling disposition of the goods does not affect the passage of risk (67(1)) — so holding the bill of lading does not keep the risk with the seller. And risk does not pass until the goods are clearly **identified to the contract**, by markings, shipping documents or notice to the buyer (67(2)) — unascertained goods within a bulk cargo being the standard illustration.\n\nThe other two situations: goods sold **in transit**, where risk passes from conclusion of the contract (Article 68), and **all other cases**, where it passes when the buyer takes over the goods or, if it delays, when the goods are placed at its disposal (Article 69).",
    earns: [
      "Identifying which of the three situations applies before naming a moment",
      "Knowing retention of documents does not hold back risk, and that identification is required",
    ],
    loses: ["Tying the passing of risk to payment or to delivery at the buyer's premises"],
  },
}
