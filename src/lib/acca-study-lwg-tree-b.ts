import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-GLOBAL · Area B — international business transactions.
 * Chapters 6–13 of the LW-Global reading tree, mapped to syllabus groups B1–B2.
 *
 * This area has no counterpart in LW-ENG, whose Area B is the law of obligations.
 * Here it is the United Nations Convention on Contracts for the International Sale of
 * Goods (the CISG) and the ICC Incoterms — one convention supplying a single set of
 * rules for both sides of a cross-border sale, and one set of standard trade terms
 * allocating cost, risk and insurance.
 *
 * The syllabus asks you to APPLY the Convention, not describe it, so these chapters
 * are built around the articles that decide scenarios: what the Convention covers,
 * how a contract forms, what each party must do, what the other may do about a
 * breach, and — the single most examined point in the area — when risk passes.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 6 · B1(a) ─────────────────────────────────────────── */

export const LWG_TREE_06: StudyChapter = {
  id: "LWG-06",
  number: 6,
  paper: "LW",
  area: "B",
  title: "The CISG: sphere of application and general provisions",
  minutes: 16,
  syllabusRefs: ["B1(a)"],
  intro:
    "Before you apply a single rule of the Convention you have to establish that it applies at all — and a surprising number of sales that look international fall outside it.",
  outcomes: [
    "Explain when the Convention applies to a contract of sale",
    "Identify the categories of sale expressly excluded from its scope",
    "Explain what counts as a sale of goods, and when a mixed supply falls outside",
    "Explain the parties' freedom to exclude or vary the Convention",
    "Apply the scope rules to decide whether a given contract is governed by the Convention",
  ],
  sections: [
    {
      id: "when-it-applies",
      heading: "When the Convention applies",
      blocks: [
        {
          kind: "definition",
          term: "The basic test",
          md: "**Article 1(1)** sets the gateway: the Convention reaches contracts of *sale of goods* \"between parties whose places of business are in different states\", provided either that both states are **contracting states**, or that the rules of private international law point to the law of a contracting state. Note what the test does *not* turn on — nationality, where the goods travel, or where the contract was signed.",
        },
        {
          kind: "list",
          style: "number",
          title: "Three conditions, all of which must hold",
          items: [
            "**A sale of goods.** The seller supplies goods — whether it makes them or buys them in — in exchange for a price.",
            "**Places of business in different states.** It is the **place of business** that matters, not nationality, incorporation or the location of the goods. Where a party has more than one, the relevant one is the one with the closest relationship to the contract.",
            "**A connection to contracting states.** Either both parties' states have ratified, or the applicable law identified by private international law is that of a contracting state.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Place of business, not nationality",
          md: "A scenario will often give you a party's nationality, the port of shipment, or where the goods were made — none of which decides the point. Find each party's **place of business**. Two companies incorporated in the same state but trading through places of business in different states are within the Convention; two parties of different nationalities both operating from the same state are not.",
        },
        {
          kind: "illustration",
          title: "Three contracts, one test",
          md: "**Contract 1.** A seller with its place of business in state X sells to a buyer whose place of business is in state Y. Both have ratified. **Within the Convention** — it applies automatically, without either party mentioning it.\n\n**Contract 2.** Both parties trade from places of business in state X, though the buyer's parent is foreign and the goods ship abroad. **Outside** — the places of business are in the same state, and where the goods go is irrelevant.\n\n**Contract 3.** Places of business in different states, but only one state has ratified. **It depends**: if private international law points to the law of the contracting state, the Convention applies; if it points to the non-contracting state's law, it does not.",
        },
      ],
      check: {
        q: "A seller incorporated in state P, trading through its place of business in state Q, sells to a buyer whose place of business is also in state Q. Both P and Q are contracting states. Does the Convention apply?",
        options: [
          "Yes, because the seller is incorporated in a different state",
          "No, because both parties' places of business are in the same state",
          "Yes, because both states are contracting states",
          "Only if the goods cross a border",
        ],
        correct: 1,
        explain:
          "NO. The test turns on PLACES OF BUSINESS being in different states, and here both are in state Q. Incorporation, nationality and the movement of the goods are all irrelevant — which is exactly the trap this kind of scenario sets.",
      },
    },
    {
      id: "exclusions",
      heading: "What the Convention does not cover",
      blocks: [
        {
          kind: "table",
          caption: "Sales expressly excluded",
          head: ["Excluded", "Why, and the qualification"],
          rows: [
            ["Goods bought for **personal, family or household use**", "Consumer sales are left to domestic protective law — **unless** the seller neither knew nor could have known the goods were for such use"],
            ["**Auction** sales", "The process and the identity of the buyer differ fundamentally from a negotiated sale"],
            ["Sales **on execution or by authority of law**", "These are enforcement processes rather than commercial bargains"],
            ["**Stocks, shares, investment securities, negotiable instruments and money**", "Not goods in the relevant sense; other regimes govern them"],
            ["**Ships, vessels, hovercraft and aircraft**", "Registration-based regimes govern their transfer"],
            ["**Electricity**", "Not treated as goods for this purpose"],
          ],
        },
        {
          kind: "list",
          title: "Three further limits on scope",
          items: [
            "**Preponderantly services.** Where the party supplying the goods owes a **preponderant part** of its obligations in labour or other services, the contract is outside the Convention — even if that party also supplies the materials.",
            "**Goods to be manufactured are still goods.** A contract to make and supply goods is within scope; it is only when the service element predominates that it falls out.",
            "**Death or personal injury.** The Convention does not govern the seller's liability for death or personal injury caused by the goods, which is left to domestic law.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "What the Convention does not decide, even when it applies",
          md: "It governs **formation** and the **rights and obligations of buyer and seller**. It does **not** decide the **validity** of the contract on grounds such as capacity, illegality or fraud, nor the effect the contract has on **property in the goods**. Those remain matters for the applicable domestic law — so an answer that resolves a capacity or title question \"under the Convention\" has gone beyond it.",
        },
        {
          kind: "definition",
          term: "Party autonomy",
          md: "The parties may **exclude the Convention entirely**, or **derogate from or vary the effect of** almost any of its provisions. So the Convention is a **default regime**: it supplies the rules the parties have not displaced. Where a contract's own terms conflict with an article, the contract normally prevails.",
        },
        {
          kind: "example",
          title: "Deciding whether the Convention governs",
          scenario:
            "Corvid Systems has its place of business in state M and Larkfield Manufacturing has its place of business in state N; both states are contracting states. Corvid agrees to design bespoke control software, install it on hardware it will buy in and supply, and train Larkfield's staff for twelve months. The hardware is worth about $90,000; the design, installation and training are priced at $410,000. The contract says nothing about the Convention. A dispute arises over whether the system conforms to specification.",
          steps: [
            { label: "Places of business", detail: "Different states, both contracting. The first two conditions of the basic test are satisfied." },
            { label: "Is it a sale of goods?", detail: "There is a sale element — the hardware Corvid buys in and supplies. So far the contract looks capable of falling within scope." },
            { label: "Apply the preponderance test", detail: "Corvid's obligations are overwhelmingly DESIGN, INSTALLATION and TRAINING: $410,000 of services against $90,000 of goods. The preponderant part of its obligations is labour and other services." },
            { label: "Conclude on scope", detail: "The contract is OUTSIDE the Convention. The service element predominates, so the whole contract falls out — it is not split into a goods part and a services part." },
            { label: "Identify what governs instead", detail: "The applicable law identified by the contract's governing law clause or, failing one, by private international law. That domestic law decides conformity." },
            { label: "Note what would have changed the answer", detail: "Had the figures been reversed — $410,000 of hardware and $90,000 of installation — the Convention would have applied automatically, with no need for either party to have mentioned it." },
          ],
          result:
            "The Convention does not govern. Two points decide questions of this shape: the **preponderance** test looks at the **value and weight of the obligations**, not at whether goods are present at all; and the Convention applies **automatically** where its conditions are met, so a contract's silence about it is not an exclusion. Excluding it takes an express term.",
        },
      ],
      check: {
        q: "A contract between parties in two contracting states is for the supply of specialist machinery, together with commissioning work worth about 15% of the price. Does the Convention apply?",
        options: [
          "No, because services are involved at all",
          "Yes, because the preponderant part of the seller's obligations is the supply of goods",
          "Only to the goods element, with domestic law governing the services",
          "No, because machinery is registered property",
        ],
        correct: 1,
        explain:
          "YES. Services do not take a contract out of scope unless they form the PREPONDERANT part of the obligations — 15% plainly does not. Note also that the contract is not split: the Convention governs the whole contract or none of it, and machinery is not within the registration-based exclusions.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Deciding scope by nationality, incorporation or where the goods are.",
      fix: "It is the parties' PLACES OF BUSINESS that must be in different states.",
    },
    {
      trap: "Assuming the Convention must be incorporated by the parties to apply.",
      fix: "It applies AUTOMATICALLY when its conditions are met. Silence is not exclusion — excluding it requires an express term.",
    },
    {
      trap: "Splitting a mixed contract into goods and services parts.",
      fix: "Apply the PREPONDERANCE test to the whole contract. If services predominate, the entire contract falls outside.",
    },
    {
      trap: "Using the Convention to resolve capacity, illegality, fraud or title questions.",
      fix: "It governs formation and the parties' obligations only. Validity and property in the goods remain matters for domestic law.",
    },
    {
      trap: "Forgetting the consumer exclusion's qualification.",
      fix: "Consumer sales are excluded UNLESS the seller neither knew nor could have known the goods were for personal, family or household use.",
    },
  ],
  keyTerms: [
    { term: "CISG", def: "The United Nations Convention on Contracts for the International Sale of Goods (1980), supplying uniform rules for cross-border sales between parties in contracting states." },
    { term: "Contracting state", def: "A state that has ratified the Convention, so that sales involving a place of business there fall within its scope." },
    { term: "Place of business", def: "The establishment through which a party trades — the connecting factor for the Convention, in place of nationality or incorporation." },
    { term: "Preponderant part test", def: "The rule taking a contract outside the Convention where the supplier's obligations consist preponderantly of labour or other services." },
    { term: "Party autonomy", def: "The parties' freedom to exclude the Convention or vary the effect of its provisions, making it a default regime." },
  ],
  summary: [
    "Article 1(1): the Convention reaches sales \"between parties whose places of business are in different states\", where those states are contracting states or private international law leads to one.",
    "Place of business is the connecting factor — not nationality, incorporation or the location of the goods.",
    "Consumer, auction, execution, securities, ship and aircraft, and electricity sales are excluded.",
    "A contract whose obligations are preponderantly services falls outside entirely; it is not split.",
    "The Convention governs formation and the parties' obligations, not validity or property in the goods.",
    "It applies automatically where its conditions are met, and the parties may exclude or vary it by express agreement.",
  ],
  knowledgeDiagnostic: [
    { q: "State the basic test for the Convention's application.", a: "Article 1(1) — a sale of goods \"between parties whose places of business are in different states\", where both states are contracting states or private international law points to a contracting state's law." },
    { q: "Name four excluded categories of sale.", a: "Consumer sales, auction sales, sales on execution or by authority of law, and sales of securities or money. Ships and aircraft, and electricity, are two more." },
    { q: "How is a mixed goods-and-services contract treated?", a: "By the preponderance test applied to the whole contract: if labour or services form the preponderant part of the supplier's obligations, the entire contract is outside the Convention." },
    { q: "Does the Convention decide whether a contract is void for illegality?", a: "No. It governs formation and the parties' rights and obligations; validity on grounds such as capacity, illegality or fraud is left to domestic law." },
    { q: "What must parties do to keep the Convention out of a contract within its scope?", a: "Exclude it expressly. Saying nothing leaves it applying automatically." },
  ],
  furtherStudy: [
    "Chapter 7 applies the Convention's formation rules.",
    "Chapter 8 covers the Incoterms parties add on top of the Convention.",
    "Chapter 3 explains why a convention of this kind exists at all.",
  ],
}

/* ── Chapter 7 · B1(b) ─────────────────────────────────────────── */

export const LWG_TREE_07: StudyChapter = {
  id: "LWG-07",
  number: 7,
  paper: "LW",
  area: "B",
  title: "Formation of contract under the Convention",
  minutes: 16,
  syllabusRefs: ["B1(b)"],
  intro:
    "Offer and acceptance, but with three differences from most domestic systems that decide exam questions: when an acceptance takes effect, what a qualified acceptance does, and whether writing is needed at all.",
  outcomes: [
    "Explain what constitutes an offer under the Convention, and distinguish it from an invitation to treat",
    "Explain when an offer may be withdrawn or revoked, and when it becomes irrevocable",
    "Explain when an acceptance becomes effective and how a contract is concluded",
    "Explain the effect of a reply that purports to accept but contains additional or different terms",
    "Apply the formation rules to determine whether, when and on what terms a contract was made",
  ],
  sections: [
    {
      id: "offer",
      heading: "Offer, withdrawal and revocation",
      blocks: [
        {
          kind: "definition",
          term: "Offer",
          md: "**Article 14(1)** gives the test: \"a proposal for concluding a contract addressed to one or more specific persons\" which is *sufficiently definite* and indicates an **intention to be bound** on acceptance. The same article settles what definite means — the proposal must identify the **goods** and make provision, expressly or impliedly, for **quantity** and **price**. Miss any of those three and you have an invitation to treat.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Addressed to specific persons",
          md: "A proposal addressed to the world at large — a catalogue, a circular, a general advertisement — is **not** an offer unless the person making it clearly indicates the contrary. So a mass mailing of a price list is an **invitation to treat**, and the order placed in response is the offer. That reverses which party is the offeror, and therefore which party's terms are on the table.",
        },
        {
          kind: "table",
          caption: "Getting out of an offer: two different mechanisms",
          head: ["", "Withdrawal", "Revocation"],
          rows: [
            ["**When available**", "Before or at the same moment the offer **reaches** the offeree", "After the offer has reached the offeree but before a contract is concluded"],
            ["**Limit**", "None — the offer has not yet taken effect", "**Ineffective** once the offeree has **dispatched an acceptance**"],
            ["**When it cannot be done at all**", "—", "Where the offer **stated it was irrevocable**, or fixed a period for acceptance indicating irrevocability, or the offeree **reasonably relied** on it as irrevocable"],
          ],
        },
        {
          kind: "list",
          title: "How an offer comes to an end",
          items: [
            "**Rejection** — it terminates when the rejection reaches the offeror, even if a period for acceptance has not expired.",
            "**Effective revocation** — reaching the offeree before it dispatches an acceptance, unless the offer was irrevocable.",
            "**Lapse of time** — expiry of any period fixed, or of a reasonable time.",
            "**A counter-offer**, which both rejects the original and makes a new offer.",
          ],
        },
      ],
      check: {
        q: "An offer is posted on 1 March and reaches the offeree on 4 March. The offeree posts an acceptance on 6 March. A revocation reaches the offeree on 7 March. Is there a contract?",
        options: [
          "No — the revocation arrived before the acceptance reached the offeror",
          "Yes — revocation is ineffective once the offeree has dispatched its acceptance",
          "No, because the offer had lapsed",
          "Only if the offer said it was irrevocable",
        ],
        correct: 1,
        explain:
          "YES. Revocation must reach the offeree BEFORE it has DISPATCHED an acceptance. The acceptance was posted on 6 March and the revocation arrived on 7 March, so it came too late. Note the asymmetry the Convention builds in: revocation is measured against DISPATCH of the acceptance, while the acceptance itself only becomes effective on RECEIPT.",
      },
    },
    {
      id: "acceptance",
      heading: "Acceptance, and the moment of contract",
      blocks: [
        {
          kind: "definition",
          term: "Acceptance",
          md: "A **statement or other conduct** by the offeree indicating **assent** to the offer. **Silence or inactivity does not in itself amount to acceptance.** An acceptance becomes effective — and the contract is concluded — at the moment the **indication of assent reaches the offeror**.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Receipt, not dispatch",
          md: "Under the Convention a contract is concluded when the acceptance **reaches** the offeror. There is no postal rule making acceptance effective on posting. This matters twice over: it fixes the **moment** of contract, and it means an acceptance that never arrives concludes nothing — although, as above, **dispatch** is still the point that defeats a revocation.",
        },
        {
          kind: "definition",
          term: "Modified acceptance",
          md: "A reply purporting to accept but containing **additions, limitations or other modifications** is a **rejection and a counter-offer**. But if the modifications do **not materially alter** the offer, it **does** operate as an acceptance — on the modified terms — unless the offeror **objects without undue delay**.",
        },
        {
          kind: "list",
          title: "Modifications the Convention treats as MATERIAL",
          items: [
            "**Price**",
            "**Payment** terms",
            "**Quality and quantity** of the goods",
            "**Place and time of delivery**",
            "The extent of one party's **liability** to the other",
            "**Settlement of disputes** — including an arbitration clause",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Adding an arbitration clause in the acceptance is material",
          md: "It is easy to assume a dispute-resolution term is administrative detail. The Convention lists **settlement of disputes** among the material alterations, so a reply that accepts the price and quantity but adds an arbitration clause is a **counter-offer** — there is no contract until the original offeror accepts it. Scenarios use exactly this to test whether a contract exists at all.",
        },
        {
          kind: "example",
          title: "Working out whether — and on what terms — a contract was made",
          scenario:
            "On 2 May, Aldbury Mills (place of business in state R) emails Cheveley Textiles (state S) offering 40,000 metres of cloth at $6.20 per metre, delivery in July, payment 30 days from invoice; both states are contracting states. On 5 May Cheveley replies: \"We accept. Delivery must be split across July and August, and any dispute shall be referred to arbitration in state S.\" Aldbury does not respond. On 20 May Cheveley emails again: \"Ignore our earlier points — we accept your terms exactly as offered.\" Aldbury replies on 21 May that it has sold the cloth elsewhere.",
          steps: [
            { label: "Characterise the 2 May email", detail: "Addressed to a specific person, identifies goods, quantity and price, and shows an intention to be bound. It is an OFFER." },
            { label: "Characterise the 5 May reply", detail: "It purports to accept but changes the TIME OF DELIVERY and adds a SETTLEMENT OF DISPUTES term. Both are listed as MATERIAL alterations, so this is a REJECTION and a COUNTER-OFFER — not an acceptance." },
            { label: "Note the consequence for the original offer", detail: "The original offer TERMINATED when the rejection reached Aldbury on 5 May. There was nothing left for Cheveley to accept afterwards." },
            { label: "Characterise Aldbury's silence", detail: "Silence or inactivity is NOT acceptance. Aldbury's failure to answer the counter-offer concluded nothing." },
            { label: "Characterise the 20 May email", detail: "Because the original offer had gone, this is not an acceptance of it. It is a fresh OFFER by Cheveley on Aldbury's original terms." },
            { label: "Apply the outcome", detail: "Aldbury's 21 May reply rejects that fresh offer. There is NO CONTRACT at any point, and Aldbury is free to have sold the cloth." },
          ],
          result:
            "No contract. Two rules do the work: a **material modification is a counter-offer**, which kills the original offer, and **silence is not acceptance**. Had Cheveley's 5 May reply changed only something immaterial — the packaging description, say — it would have operated as an acceptance on those modified terms unless Aldbury objected without undue delay, and the answer would have been the opposite.",
        },
      ],
      check: {
        q: "A reply accepting an offer in all respects but adding that disputes are to be arbitrated is:",
        options: [
          "An effective acceptance, because dispute resolution is not a commercial term",
          "A rejection and counter-offer, because settlement of disputes is a material alteration",
          "An acceptance unless the offeror objects without undue delay",
          "Ineffective for any purpose",
        ],
        correct: 1,
        explain:
          "A REJECTION AND COUNTER-OFFER. Settlement of disputes is expressly among the material alterations, alongside price, payment, quality, quantity, delivery and liability. The \"unless the offeror objects\" rule applies only to modifications that are NOT material.",
      },
    },
    {
      id: "form",
      heading: "Form, and proving the contract",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "No writing requirement",
          md: "**Article 11** dispenses with formality altogether: a contract of sale \"need not be in writing and is not subject to any other requirement as to form\", and may be proved *by any means*, witnesses included. The practical consequence is that an exchange of emails, or even conduct, can conclude a binding international sale — and parties who assume nothing is agreed until a formal document is signed are frequently wrong.",
        },
        {
          kind: "list",
          title: "Two qualifications worth knowing",
          items: [
            "**A contracting state may have declared otherwise**, in which case a writing requirement applies where a party has its place of business in that state. A scenario mentioning such a declaration is signalling the point.",
            "**The parties may impose their own form requirement** — a term that no variation is effective unless in signed writing is valid and will be applied.",
          ],
        },
        {
          kind: "definition",
          term: "\"Reaches\"",
          md: "A communication **reaches** the addressee when it is made **orally to them**, or **delivered by any other means to them personally, to their place of business or mailing address**, or — failing those — to their habitual residence. The concept matters because withdrawal, revocation, rejection and acceptance are all timed by when something reaches a party.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Applying a postal rule so that acceptance is effective on posting.",
      fix: "Under the Convention an acceptance is effective when it REACHES the offeror. Dispatch matters only for defeating a revocation.",
    },
    {
      trap: "Treating an added arbitration or dispute clause as immaterial.",
      fix: "Settlement of disputes is expressly a MATERIAL alteration, so the reply is a counter-offer.",
    },
    {
      trap: "Treating silence as acceptance where the offeror said silence would suffice.",
      fix: "Silence or inactivity does not IN ITSELF amount to acceptance; an offeror cannot impose it unilaterally.",
    },
    {
      trap: "Assuming a general advertisement or price list is an offer.",
      fix: "A proposal must be addressed to specific persons unless the contrary is clearly indicated, so a circular is an invitation to treat.",
    },
    {
      trap: "Requiring writing for an international sale.",
      fix: "No form is required and the contract may be proved by any means — unless a state has declared otherwise or the parties imposed their own requirement.",
    },
    {
      trap: "Overlooking that a rejection kills the original offer.",
      fix: "Once a rejection or counter-offer reaches the offeror the offer is gone, so a later \"acceptance\" of it is a fresh offer.",
    },
  ],
  keyTerms: [
    { term: "Offer", def: "A sufficiently definite proposal addressed to specific persons, indicating an intention to be bound, identifying the goods and providing for quantity and price." },
    { term: "Withdrawal of an offer", def: "Stopping an offer before or as it reaches the offeree, so that it never takes effect." },
    { term: "Revocation", def: "Cancelling an offer after it has reached the offeree, effective only if it arrives before the offeree dispatches an acceptance and the offer was not irrevocable." },
    { term: "Acceptance", def: "A statement or conduct indicating assent, effective when it reaches the offeror; silence or inactivity is not enough." },
    { term: "Modified acceptance", def: "A reply adding or altering terms: a counter-offer if the change is material, otherwise an acceptance on those terms unless the offeror objects without undue delay." },
    { term: "Material alteration", def: "A change to price, payment, quality, quantity, place or time of delivery, liability, or settlement of disputes." },
    { term: "Reaches", def: "Communication made orally to a party, or delivered to them personally, at their place of business or mailing address, or at their habitual residence." },
  ],
  summary: [
    "An offer must be addressed to specific persons, be sufficiently definite as to goods, quantity and price, and show intention to be bound.",
    "Withdrawal works before the offer reaches the offeree; revocation only before the offeree dispatches an acceptance.",
    "An offer may be irrevocable by its terms or through the offeree's reasonable reliance.",
    "An acceptance is effective when it reaches the offeror — there is no postal rule — and silence is not acceptance.",
    "A materially modified acceptance is a counter-offer; an immaterially modified one accepts unless the offeror objects without undue delay.",
    "Price, payment, quality, quantity, delivery, liability and dispute settlement are all material.",
    "No writing is required and the contract may be proved by any means.",
  ],
  knowledgeDiagnostic: [
    { q: "When is a contract concluded under the Convention?", a: "When the indication of assent reaches the offeror. There is no rule making acceptance effective on dispatch." },
    { q: "Why does dispatch of an acceptance still matter?", a: "Because a revocation is ineffective once the offeree has dispatched its acceptance, even though the contract itself is not concluded until the acceptance arrives." },
    { q: "List the material alterations.", a: "Price, payment, quality and quantity of the goods, place and time of delivery, the extent of liability, and settlement of disputes." },
    { q: "Is a catalogue sent to many potential customers an offer?", a: "No — a proposal must be addressed to specific persons unless the contrary is clearly indicated, so it is an invitation to treat." },
    { q: "Must an international sale contract be in writing?", a: "No. No form is required and it may be proved by any means, unless a contracting state has declared otherwise or the parties imposed their own requirement." },
  ],
  furtherStudy: [
    "Chapter 8 adds the Incoterm that allocates cost, risk and insurance once the contract is formed.",
    "Chapters 9–12 set out what each party must then do, and what follows from a breach.",
  ],
}

/* ── Chapter 8 · B1(c) ─────────────────────────────────────────── */

export const LWG_TREE_08: StudyChapter = {
  id: "LWG-08",
  number: 8,
  paper: "LW",
  area: "B",
  title: "Incoterms: allocating cost, risk and insurance",
  minutes: 15,
  syllabusRefs: ["B1(c)"],
  intro:
    "Three letters in a contract can move hundreds of thousands of dollars of risk from one party to the other. Incoterms exist so that those three letters mean the same thing in every country.",
  outcomes: [
    "Explain what Incoterms are, who produces them and how they bind the parties",
    "Explain the four groups of Incoterms and the pattern each follows",
    "Identify, for a given Incoterm, who bears cost, who bears risk and who must insure",
    "Explain the relationship between an Incoterm and the Convention's rules on risk",
    "Apply an Incoterm to decide which party bears a loss",
  ],
  sections: [
    {
      id: "what-they-are",
      heading: "What Incoterms are — and what they are not",
      blocks: [
        {
          kind: "definition",
          term: "Incoterms",
          md: "Standard trade terms published by the **International Chamber of Commerce**, each a three-letter code defining the seller's and buyer's respective obligations for **delivery**, the **transfer of risk**, the allocation of **costs**, and responsibility for **export and import clearance** and **insurance**.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "They bind because the parties adopt them",
          md: "Incoterms are **not legislation and not a convention**. The ICC is a business organisation. A term becomes binding only because the parties **incorporate it into their contract**, which is why a contract should identify the term **and the version** — \"CIF Rotterdam, Incoterms 2020\". A bare \"CIF\" leaves room to argue about which edition's rules apply.",
        },
        {
          kind: "list",
          title: "What an Incoterm does NOT do",
          items: [
            "It does **not transfer ownership** of the goods. Property passes under the applicable domestic law, not under the Incoterm.",
            "It does **not price the goods** or settle payment terms.",
            "It does **not replace the Convention.** The Convention governs the parties' obligations and remedies; the Incoterm settles delivery, cost, risk and insurance — and where it does, it **displaces the Convention's default risk rules**, because the parties are free to vary them.",
            "It does **not** by itself provide a dispute resolution mechanism or a governing law.",
          ],
        },
      ],
    },
    {
      id: "the-four-groups",
      heading: "The four groups, and the pattern each follows",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Risk moves later along the chain as you go from E to D",
            caption: "The seller's obligations grow at every step.",
            data: {
              steps: [
                { label: "E — Departure", sub: "Risk passes at the seller's premises" },
                { label: "F — Main carriage unpaid", sub: "Risk passes on handing to the carrier" },
                { label: "C — Main carriage paid", sub: "Seller pays freight; risk still passes on shipment" },
                { label: "D — Arrival", sub: "Risk passes at the named destination" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The groups and the leading terms",
          head: ["Group", "Meaning", "Examples", "Where risk passes"],
          rows: [
            ["**E — Departure**", "Seller does least: makes the goods available at its own premises", "**EXW** (Ex Works)", "At the seller's premises, when the goods are placed at the buyer's disposal"],
            ["**F — Main carriage unpaid**", "Seller delivers to a carrier; **buyer** arranges and pays the main carriage", "**FCA**, **FAS**, **FOB**", "On delivery to the carrier — under FOB, when the goods are on board the vessel"],
            ["**C — Main carriage paid**", "**Seller** arranges and pays the main carriage, but risk still passes early", "**CFR**, **CIF**, **CPT**, **CIP**", "On shipment — **not** on arrival"],
            ["**D — Arrival**", "Seller does most: delivers at the named destination", "**DAP**, **DPU**, **DDP**", "At the named place of destination"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The C group is where candidates lose marks",
          md: "Under **CFR** and **CIF** the **seller pays the freight to the named destination**, which makes it look as though the seller carries the goods all the way. It does not. **Risk passes on shipment.** So goods lost in mid-ocean under CIF are the **buyer's** loss — the buyer must claim on the insurance the seller was obliged to take out, and must still pay the price. Separating **who pays the cost** from **who bears the risk** is the whole point of the group.",
        },
        {
          kind: "table",
          caption: "The four terms most often examined",
          head: ["Term", "Seller must", "Risk passes", "Insurance"],
          rows: [
            ["**EXW**", "Place the goods at the buyer's disposal at its premises", "At the seller's premises", "Buyer's concern throughout"],
            ["**FOB**", "Clear the goods for export and place them on board the named vessel", "When the goods are on board", "Buyer's concern"],
            ["**CFR**", "Contract and pay for carriage to the named destination", "On shipment", "**Neither** party obliged — a gap the buyer must fill"],
            ["**CIF**", "Contract and pay for carriage **and take out insurance**", "On shipment", "**Seller** insures, but only to the **minimum** cover"],
            ["**DDP**", "Deliver at the named destination, cleared for import, duties paid", "At the destination", "Seller's concern until delivery"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "CIF insurance is minimum cover only",
          md: "The seller's duty under CIF is to obtain **minimum** insurance cover. A buyer who wants wider cover — against war risk, or on a higher valuation — must **arrange it itself** or negotiate an express term. A scenario in which the goods are damaged in a way the minimum policy excludes is testing exactly this.",
        },
        {
          kind: "example",
          title: "Deciding who bears the loss",
          scenario:
            "Berenford Ceramics (state T) sells 600 crates of tiles to Halloway Interiors (state U) for $240,000 on terms \"CIF Port of Aldstone, Incoterms 2020\". Berenford clears the goods for export, loads them on board the Marisol on 3 June, takes out insurance to the minimum cover and sends the documents to Halloway. On 11 June the Marisol encounters heavy weather and 180 crates are destroyed. The policy covers the loss. Halloway refuses to pay the price, arguing that Berenford undertook to deliver the tiles to Aldstone and only 420 crates arrived.",
          steps: [
            { label: "Identify the group and what it settles", detail: "CIF is a C-GROUP term: the SELLER contracts and pays for carriage to the named destination and insures the goods. That is a COST obligation." },
            { label: "Locate the passing of risk", detail: "Under CIF risk passes ON SHIPMENT — when the goods are placed on board. That happened on 3 June, eight days before the storm." },
            { label: "Apply it to the loss", detail: "The tiles were destroyed AFTER risk had passed, so the loss falls on HALLOWAY. Berenford has performed: it shipped conforming goods, paid the freight, insured and tendered the documents." },
            { label: "Deal with Halloway's argument", detail: "Paying the freight to Aldstone is not a promise to DELIVER at Aldstone. Halloway has confused the cost obligation with the risk allocation — the error the C group is designed to expose." },
            { label: "State the payment position", detail: "Halloway must pay the FULL $240,000. Its remedy for the lost crates is a claim on the INSURANCE, which is why the seller was required to take it out and hand over the policy with the documents." },
            { label: "Note what would change the answer", detail: "On a D-group term such as DAP Aldstone, risk would pass only at the destination, and the loss of 180 crates would be BERENFORD's. And if the damage were of a kind the minimum CIF cover excluded, Halloway would bear an uninsured loss and still owe the price." },
          ],
          result:
            "Halloway bears the loss and must pay in full, recovering under the policy. The reasoning that decides every question of this shape: **identify the group, then separate cost from risk**. Under a C term the seller pays to get the goods there, but the buyer has owned the risk since shipment — and the insurance obligation exists precisely because of that mismatch.",
        },
      ],
      check: {
        q: "Goods sold CIF are destroyed by fire in transit. Who bears the loss and who must pay the price?",
        options: [
          "The seller bears the loss, because it agreed to pay carriage to the destination",
          "The buyer bears the loss, must pay the full price, and claims on the insurance the seller took out",
          "The loss is shared equally, as neither party was at fault",
          "The seller bears the loss unless it can prove the fire was the carrier's fault",
        ],
        correct: 1,
        explain:
          "The BUYER bears it. Under CIF risk passes ON SHIPMENT, so a loss in transit is the buyer's — and the buyer still owes the full price, claiming instead on the policy the seller was obliged to take out. Paying the freight to the destination is a COST obligation, not a promise to deliver there.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Reading CFR or CIF as meaning the seller bears risk to the destination.",
      fix: "Risk passes ON SHIPMENT under every C term. The seller pays the freight; the buyer owns the risk.",
    },
    {
      trap: "Assuming CIF insurance is comprehensive.",
      fix: "The seller need obtain only MINIMUM cover. A buyer wanting more must arrange it or negotiate an express term.",
    },
    {
      trap: "Expecting an Incoterm to transfer ownership.",
      fix: "It allocates delivery, cost, risk, clearance and insurance. Property passes under the applicable domestic law.",
    },
    {
      trap: "Treating Incoterms as legislation.",
      fix: "They are ICC standard terms and bind only because the parties incorporated them — ideally naming the version.",
    },
    {
      trap: "Forgetting that no party is obliged to insure under CFR.",
      fix: "CFR covers cost and freight only. The buyer must arrange its own insurance, and a scenario relying on that gap is a common one.",
    },
    {
      trap: "Applying the Convention's default risk rules where an Incoterm applies.",
      fix: "The parties may vary those rules, and adopting an Incoterm does exactly that. The Incoterm governs the passing of risk.",
    },
  ],
  keyTerms: [
    { term: "Incoterms", def: "ICC standard three-letter trade terms allocating delivery, cost, risk, clearance and insurance between seller and buyer." },
    { term: "EXW", def: "Ex Works: the seller places the goods at the buyer's disposal at its own premises, and risk passes there." },
    { term: "FOB", def: "Free on Board: the seller clears for export and places the goods on board the named vessel, where risk passes." },
    { term: "CFR", def: "Cost and Freight: the seller pays carriage to the named destination but risk passes on shipment, and neither party is obliged to insure." },
    { term: "CIF", def: "Cost, Insurance and Freight: as CFR, but the seller must also take out insurance to the minimum cover." },
    { term: "DDP", def: "Delivered Duty Paid: the seller delivers at the named destination cleared for import with duties paid, bearing risk until then." },
  ],
  summary: [
    "Incoterms are ICC standard terms binding only because the parties incorporate them, ideally with the version named.",
    "They allocate delivery, cost, risk, clearance and insurance — not ownership, price or governing law.",
    "The four groups run E (departure), F (main carriage unpaid), C (main carriage paid) and D (arrival).",
    "Under every C term the seller pays the freight but risk passes on shipment.",
    "CIF requires the seller to insure, but only to minimum cover; under CFR nobody is obliged to insure.",
    "Adopting an Incoterm displaces the Convention's default risk rules, which the parties are free to vary.",
    "Separating who pays cost from who bears risk is what decides these questions.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do Incoterms bind the parties?", a: "Because the parties incorporate them into the contract. They are ICC standard terms, not legislation." },
    { q: "Under CIF, when does risk pass and who insures?", a: "Risk passes on shipment, and the seller must insure — but only to the minimum cover." },
    { q: "What is the difference between CFR and CIF?", a: "Both put freight on the seller and pass risk on shipment. Only CIF obliges the seller to insure." },
    { q: "Does an Incoterm transfer ownership of the goods?", a: "No. It settles delivery, cost, risk, clearance and insurance. Property passes under the applicable domestic law." },
    { q: "Under EXW, what must the seller do?", a: "Place the goods at the buyer's disposal at its own premises. Risk passes there and the buyer handles collection, export clearance and carriage." },
  ],
  furtherStudy: [
    "Chapter 13 sets out the Convention's default risk rules, which apply where no Incoterm displaces them.",
    "Chapter 14 covers the bill of lading that evidences shipment under an F or C term.",
  ],
}

/* ── Chapter 9 · B2(a)(i), (ii) ────────────────────────────────── */

export const LWG_TREE_09: StudyChapter = {
  id: "LWG-09",
  number: 9,
  paper: "LW",
  area: "B",
  title: "The seller's obligations: delivery, documents and conformity",
  minutes: 16,
  syllabusRefs: ["B2(a)"],
  intro:
    "The seller owes three things: the right goods, in the right place, at the right time, with the right documents. Conformity is where most disputes actually arise.",
  outcomes: [
    "Explain the seller's obligations as to the place and time of delivery",
    "Explain the seller's obligation to hand over documents",
    "Explain what conformity of the goods requires",
    "Explain the seller's liability for a lack of conformity and the point at which it is judged",
    "Explain the buyer's duties to examine the goods and give notice, and the effect of failing to do so",
  ],
  sections: [
    {
      id: "delivery",
      heading: "Delivery and documents",
      blocks: [
        {
          kind: "table",
          caption: "Where the seller must deliver, in the absence of agreement — article 31",
          head: ["Situation", "Delivery is effected by"],
          rows: [
            ["The contract **involves carriage** of the goods — art 31(a)", "\"Handing the goods to the first carrier for transmission to the buyer\""],
            ["**Specific goods**, or goods drawn from a specified stock or to be manufactured, and the parties knew the place at conclusion — art 31(b)", "\"Placing the goods at the buyer's disposal at that place\""],
            ["**Any other case**", "Placing the goods at the buyer's disposal at the **seller's place of business** at conclusion of the contract"],
          ],
        },
        {
          kind: "list",
          title: "Time of delivery, and the documents",
          items: [
            "**On the date fixed** by the contract, or determinable from it.",
            "**Within a period fixed** by the contract — and where a period is fixed, the **seller** may generally choose the date within it, unless the circumstances show the choice was the buyer's.",
            "**Within a reasonable time** after conclusion, where the contract fixes neither.",
            "**Documents.** Where the seller is bound to hand over documents relating to the goods, it must do so at the **time, place and in the form** the contract requires — and may cure a defect in them up to that time, provided it causes the buyer no unreasonable inconvenience or expense.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Handing to the first carrier is delivery",
          md: "Where carriage is involved, the seller performs its delivery obligation by handing the goods to the **first carrier** — not by getting them to the buyer. This is the default the Convention supplies, and it aligns with the F and C group Incoterms. It is also why the buyer's protection lies in **conformity** and **insurance** rather than in a promise of safe arrival.",
        },
      ],
    },
    {
      id: "conformity",
      heading: "Conformity of the goods",
      blocks: [
        {
          kind: "definition",
          term: "Conformity",
          md: "**Article 35(1)**: goods conform if they match the contract in **quantity, quality and description** and are **contained or packaged** as it requires. **Article 35(2)** then supplies four default standards, applying unless the parties agree otherwise — goods do not conform unless they are \"fit for the purposes for which goods of the same description would ordinarily be used\"; fit for any **particular purpose made known** to the seller, unless the buyer did not or could not reasonably rely on the seller's skill and judgement; of the **quality of any sample or model** held out; and packaged in the manner **usual** for such goods.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "When conformity is judged",
          md: "**Article 36(1)** fixes the moment of judgement: the seller answers for a lack of conformity \"existing at the time risk passes to the buyer, even if it only becomes apparent later\". **Article 36(2)** extends that to a lack of conformity arising **after** risk passes, where the cause is the seller **breaching an obligation of its own** — breach of a guarantee that the goods would stay fit for a period among them. So the moment risk passes is the dividing line, which is why chapter 13 matters to this chapter.",
        },
        {
          kind: "list",
          title: "The buyer's own duties — and the trap in them",
          items: [
            "**Examine the goods**, or have them examined, within as **short a period as is practicable** in the circumstances. Where carriage is involved, examination may be deferred until **arrival**.",
            "**Article 39(1) — give notice.** The buyer must notify the seller, \"specifying the nature of the lack of conformity\", within a **reasonable time** after discovering it or after it ought to have been discovered.",
            "**Article 39(2) — the long-stop.** \"The buyer loses the right to rely on a lack of conformity\" if it gives no notice within **two years** of the goods being actually handed over, unless the contract gives a longer guarantee period.",
            "**Consequence of failure.** A buyer who fails to give the required notice **loses the right to rely on the lack of conformity at all** — no rejection, no price reduction, no damages.",
            "**The exception.** The seller cannot rely on the buyer's failure to notify if the lack of conformity relates to facts it **knew or ought to have known** and did not disclose.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The notice requirement is the commonest way a good claim is lost",
          md: "A buyer with genuinely defective goods can end up with **no remedy whatever** simply because it waited. When a scenario tells you how long the buyer took to complain, that detail is doing work. Look for the date of handover, the date the defect was or should have been discovered, and the date of notice — and check the two-year long-stop as well as the reasonable-time test.",
        },
        {
          kind: "definition",
          term: "Third party claims",
          md: "**Article 41** requires the seller to deliver goods \"free from any right or claim of a third party\" — unless the buyer agreed to take them subject to it. **Article 42** narrows that where the claim rests on **industrial or other intellectual property**: the seller answers only for rights it knew or ought to have known of, judged by \"the law of the state where the goods will be resold or used\" if the parties contemplated that state, and otherwise by the law of the buyer's place of business. Under **article 43** the buyer must give **notice** of a third party claim within a reasonable time, on pain of losing the right to rely on it.",
        },
        {
          kind: "example",
          title: "Applying conformity and notice together",
          scenario:
            "Pentley Foods (state V) buys 20 tonnes of powdered flavouring from Solvarn Ingredients (state W) for use in confectionery, telling Solvarn what it is for. Terms are FOB, and the goods are loaded on 4 March and arrive on 2 April. Pentley stores the drums unopened until 19 May, when it begins production and finds the powder has clumped into unusable blocks. Expert evidence shows the clumping was caused by moisture present in the drums at the time of loading. Pentley notifies Solvarn on 27 May and claims damages.",
          steps: [
            { label: "Is there a lack of conformity?", detail: "Yes. Pentley made the particular purpose known and relied on Solvarn's skill and judgement, and the powder is unusable for it. The goods are also not fit for the ordinary purpose of such powder." },
            { label: "Did it exist when risk passed?", detail: "Terms are FOB, so risk passed when the goods went on board on 4 March. The moisture was present AT LOADING, so the lack of conformity existed at that moment — Solvarn is liable in principle even though it only became apparent in May." },
            { label: "Test the duty to examine", detail: "Pentley had to examine within as short a period as PRACTICABLE, deferrable to ARRIVAL because carriage was involved. Arrival was 2 April; the drums sat unopened for over six weeks." },
            { label: "Test the notice", detail: "Notice was given eight days after DISCOVERY, which is prompt. The difficulty is that discovery was late because examination was late — the clock runs from when the defect OUGHT to have been discovered." },
            { label: "Reach the likely conclusion", detail: "Solvarn has a strong argument that a reasonable buyer would have examined a moisture-sensitive ingredient at or shortly after arrival. If so, notice given nearly two months after the defect ought to have been discovered is out of time, and Pentley LOSES the right to rely on the lack of conformity entirely." },
            { label: "Look for the escape", detail: "Pentley's best route is the exception: if Solvarn KNEW OR OUGHT TO HAVE KNOWN the drums were damp and did not disclose it, it cannot rely on Pentley's late notice. The expert evidence about moisture at loading is what would support that." },
          ],
          result:
            "A clear lack of conformity that may nonetheless yield no remedy, because of **late examination** rather than late notice. Two points decide questions of this shape: examination may be deferred to **arrival** but not indefinitely, and the notice clock runs from when the defect **ought** to have been discovered. The seller's own knowledge is the buyer's way back in.",
        },
      ],
      check: {
        q: "Goods are handed over in January. A latent defect existing at delivery is discovered in November and notified promptly. The seller argues the claim is barred. Is it?",
        options: [
          "Yes — any notice given more than three months after delivery is too late",
          "No, provided a reasonable buyer could not have discovered it earlier and notice was within two years of handover",
          "Yes, because liability ends when risk passes",
          "No, because notice is never required for latent defects",
        ],
        correct: 1,
        explain:
          "NOT BARRED, on those facts. The notice clock runs from when the defect was, or ought to have been, discovered — so a genuinely latent defect can be notified much later — subject to the TWO-YEAR long-stop from actual handover. The seller remains liable for a lack of conformity existing when risk passed even if it appears afterwards.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying the seller must get the goods to the buyer where carriage is involved.",
      fix: "Delivery is effected by handing them to the FIRST CARRIER, unless the contract or an Incoterm provides otherwise.",
    },
    {
      trap: "Judging conformity at the date of arrival.",
      fix: "It is judged at the time RISK PASSES. A defect existing then makes the seller liable even if it appears later.",
    },
    {
      trap: "Overlooking the buyer's duty to examine and notify.",
      fix: "Failure to give notice specifying the lack of conformity loses the buyer EVERY remedy for it.",
    },
    {
      trap: "Running the notice period from discovery only.",
      fix: "It runs from discovery OR from when the defect ought to have been discovered — and there is a two-year long-stop from handover.",
    },
    {
      trap: "Forgetting the seller's own knowledge defeats the notice point.",
      fix: "A seller who knew or ought to have known of the defect and did not disclose it cannot rely on the buyer's late notice.",
    },
    {
      trap: "Assuming a stated particular purpose always binds the seller.",
      fix: "It does not where the buyer did not, or could not reasonably, rely on the seller's skill and judgement.",
    },
  ],
  keyTerms: [
    { term: "Conformity", def: "Goods matching the contract in quantity, quality, description and packaging, and fit for ordinary and any notified particular purpose." },
    { term: "Delivery", def: "Handing the goods to the first carrier where carriage is involved, or otherwise placing them at the buyer's disposal at the contractual or the seller's place." },
    { term: "Duty to examine", def: "The buyer's obligation to examine the goods within as short a period as practicable, deferrable until arrival where carriage is involved." },
    { term: "Notice of lack of conformity", def: "The buyer's notice specifying the defect, required within a reasonable time of actual or constructive discovery and within two years of handover." },
    { term: "Third party claim", def: "A right or claim of a third party in the goods, which the seller must clear unless the buyer agreed to take subject to it." },
  ],
  summary: [
    "Where carriage is involved, delivery means handing the goods to the first carrier.",
    "Where a period is fixed for delivery the seller may usually choose the date within it.",
    "Conformity covers quantity, quality, description and packaging, plus fitness for ordinary and notified particular purposes.",
    "Conformity is judged when risk passes; a defect existing then binds the seller even if it appears later.",
    "The buyer must examine within as short a period as practicable, deferrable to arrival, and give specifying notice.",
    "Failure to notify in time loses every remedy, subject to a two-year long-stop and the seller's own knowledge.",
    "The seller must also deliver free of third party claims, with a narrower rule for intellectual property.",
  ],
  knowledgeDiagnostic: [
    { q: "When is conformity judged?", a: "At the time risk passes to the buyer. The seller is liable for a defect existing then even if it only becomes apparent later." },
    { q: "What must a buyer do to preserve a conformity claim?", a: "Examine the goods within as short a period as practicable — deferrable to arrival where carriage is involved — and give notice specifying the defect within a reasonable time." },
    { q: "What is the long-stop on notice?", a: "Two years from the goods being actually handed over, unless the contract provides a longer guarantee period." },
    { q: "When can a seller not rely on the buyer's late notice?", a: "Where the lack of conformity relates to facts the seller knew or ought to have known and did not disclose." },
    { q: "Does a stated particular purpose always make the seller liable if the goods are unfit for it?", a: "No — not where the buyer did not, or could not reasonably, rely on the seller's skill and judgement." },
  ],
  furtherStudy: [
    "Chapter 10 sets out what the buyer may do about a breach.",
    "Chapter 13 fixes the moment risk passes, which decides when conformity is judged.",
  ],
}

/* ── Chapter 10 · B2(a)(iii) ───────────────────────────────────── */

export const LWG_TREE_10: StudyChapter = {
  id: "LWG-10",
  number: 10,
  paper: "LW",
  area: "B",
  title: "The buyer's remedies for the seller's breach",
  minutes: 17,
  syllabusRefs: ["B2(a)"],
  intro:
    "Five remedies, and which of them is available turns almost entirely on one question: was the breach fundamental?",
  outcomes: [
    "Identify the remedies available to a buyer for the seller's breach",
    "Define fundamental breach and explain its two cumulative requirements",
    "Explain when the buyer may require performance, substitute goods or repair",
    "Explain when the buyer may avoid the contract, and the notice required",
    "Explain the buyer's right to reduce the price, and the effect of fixing an additional period",
  ],
  sections: [
    {
      id: "fundamental-breach",
      heading: "Fundamental breach: the gateway",
      blocks: [
        {
          kind: "definition",
          term: "Fundamental breach",
          md: "A breach is fundamental where it results in such **detriment** to the other party as **substantially to deprive** them of what they were entitled to expect under the contract, **and** that result was **foreseeable** — the party in breach, or a reasonable person of the same kind in the same circumstances, would have foreseen it. **Both** limbs must be satisfied.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why the gateway matters",
          md: "Fundamental breach is what unlocks the two most powerful remedies: **avoidance** of the contract and a demand for **substitute goods**. A breach that is real but not fundamental leaves the buyer with damages, price reduction, repair and performance — but it cannot walk away. So the first step in any remedies question is to test the breach against **both** limbs of the definition.",
        },
        {
          kind: "table",
          caption: "The buyer's remedies at a glance",
          head: ["Remedy", "Available when", "Note"],
          rows: [
            ["**Damages**", "Any breach", "Cumulative with every other remedy — the buyer does not lose damages by choosing something else"],
            ["**Require performance**", "Any breach", "Not available if the buyer has resorted to an inconsistent remedy"],
            ["**Substitute goods**", "**Fundamental** breach only", "Also requires timely examination and notice"],
            ["**Repair**", "Any lack of conformity, if the request is **reasonable**", "Requires notice; unreasonable where repair is disproportionate"],
            ["**Price reduction**", "Any lack of conformity", "In the proportion the value of the goods delivered bears to the value conforming goods would have had"],
            ["**Avoidance**", "**Fundamental** breach, or failure to deliver within an additional period fixed", "Requires **notice** to the seller"],
          ],
        },
      ],
      check: {
        q: "A delivery of industrial fasteners is 3% below the contract quantity, easily made up from another supplier at negligible cost. Is the breach fundamental?",
        options: [
          "Yes — any failure to deliver the contract quantity is fundamental",
          "No — the buyer is not substantially deprived of what it was entitled to expect",
          "Yes, because the seller could foresee that quantity mattered",
          "It cannot be fundamental unless the contract says so",
        ],
        correct: 1,
        explain:
          "NO. Fundamental breach needs SUBSTANTIAL DEPRIVATION as well as foreseeability, and a 3% shortfall easily covered elsewhere does not substantially deprive the buyer. So avoidance and substitute goods are unavailable — but damages, performance of the balance and price reduction remain.",
      },
    },
    {
      id: "performance-and-cure",
      heading: "Performance, substitute goods, repair — and the additional period",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Requiring performance and its variants",
          items: [
            "**Require performance** of the seller's obligations generally — unless the buyer has resorted to a remedy inconsistent with that, such as avoidance.",
            "**Substitute goods**, but only where the lack of conformity is a **fundamental** breach and the request is made in the notice of lack of conformity or within a reasonable time after it.",
            "**Repair**, unless that is **unreasonable** having regard to all the circumstances — a disproportionately expensive repair of a cheap item is unreasonable — again requested with or shortly after the notice.",
          ],
        },
        {
          kind: "definition",
          term: "The additional period (fixing a deadline)",
          md: "The buyer may **fix an additional period of reasonable length** for the seller to perform. During that period the buyer **may not resort to any remedy for breach**, though it does not lose the right to damages for delay. The power matters because if the seller **fails to deliver within the additional period**, the buyer may **avoid the contract even though the original breach was not fundamental**.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "How a non-fundamental delay becomes a right to avoid",
          md: "Late delivery is often **not** fundamental — the buyer is inconvenienced but not substantially deprived, so it cannot walk away. Fixing a reasonable additional period converts the position: if the seller misses that deadline too, the buyer may avoid. This is the single most useful practical device in the buyer's remedies, and scenarios about delayed delivery are usually testing it.",
        },
        {
          kind: "list",
          title: "The seller's right to cure",
          items: [
            "The seller may **remedy at its own expense** any failure to perform, **even after the delivery date**, provided it does so **without unreasonable delay** and without causing the buyer unreasonable inconvenience or uncertainty about reimbursement of expenses.",
            "The seller may **request** the buyer to say whether it will accept performance; if the buyer does not respond within a reasonable time, the seller may perform within the time indicated in its request.",
            "**The buyer keeps its right to damages** for the delay, even where cure is accepted.",
            "**But** the right to cure does not survive where the buyer has already **validly avoided** the contract for fundamental breach.",
          ],
        },
      ],
    },
    {
      id: "avoidance-and-reduction",
      heading: "Avoidance and price reduction",
      blocks: [
        {
          kind: "table",
          caption: "When the buyer may avoid",
          head: ["Ground", "Detail"],
          rows: [
            ["**Fundamental breach**", "The seller's failure to perform any obligation amounts to a fundamental breach"],
            ["**Missing the additional period**", "The seller has not delivered within the additional period the buyer fixed, or declares it will not deliver within it"],
            ["**Late delivery already made**", "Where the seller has delivered late, the buyer must declare avoidance within a **reasonable time** after becoming aware that delivery was made — or lose the right"],
            ["**Other breaches already performed**", "Article 49(2): within a reasonable time \"after the buyer knew or ought to have known of the breach\", or after any additional period expired"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Avoidance requires notice, and delay destroys it",
          md: "Avoidance is **not automatic**: it is effective only if **declared by notice** to the other party. And once the seller has performed, however badly, the buyer must declare avoidance **within a reasonable time** of learning of the breach. A buyer who accepts goods, uses them for months and then purports to avoid will find the right gone — leaving damages and price reduction.",
        },
        {
          kind: "definition",
          term: "Price reduction",
          md: "Where the goods do not conform, **article 50** lets the buyer reduce the price — and it states the fraction precisely, so learn it in the Convention's own words: \"in the same proportion as the value that the goods actually delivered had at the time of delivery bears to the value that conforming goods would have had at that time\". Two features to note. The remedy is available whether or not the price has already been paid; and it is lost where the seller cures the defect, or where the buyer refuses to accept a cure the seller was entitled to make.",
        },
        {
          kind: "example",
          title: "Choosing the right remedy",
          scenario:
            "Marbeck Assembly (state X) orders 5,000 precision bearings from Duncastle Engineering (state Y) for delivery by 15 April, for use on a production line restarting on 1 May. Duncastle delivers nothing by 15 April. On 18 April Marbeck writes fixing 30 April as a final date. Duncastle delivers on 26 April, but 900 of the bearings are outside tolerance. Marbeck examines on arrival, notifies the defect on 28 April, and asks what it can do. Conforming bearings were worth $40 each; the out-of-tolerance ones are usable on lower-grade work and worth $16 each.",
          steps: [
            { label: "Assess the initial non-delivery", detail: "Delay alone is probably NOT fundamental here — the line restarts on 1 May, so a delivery in late April still serves. Marbeck could not have avoided on 16 April." },
            { label: "Note what fixing the additional period achieved", detail: "By fixing 30 April, Marbeck gave itself a right to AVOID if Duncastle missed that date, without having to prove fundamental breach. Duncastle delivered on 26 April, so that right never arose." },
            { label: "Assess the conformity breach", detail: "900 of 5,000 are defective — 18%. The remaining 4,100 conform and the line can run. This is unlikely to substantially deprive Marbeck, so it is probably NOT fundamental, and avoidance and substitute goods are unavailable." },
            { label: "Confirm the notice is good", detail: "Examination on arrival and notice on 28 April, two days later, comfortably satisfies the duty to examine and notify. Marbeck's remedies are intact." },
            { label: "Apply price reduction", detail: "Reduce the price in the proportion actual value bears to conforming value: for the 900 bearings, $16 ÷ $40 = 40%, so Marbeck pays 40% of the price attributable to them — a reduction of 60% × 900 × $40 = $21,600 of value." },
            { label: "Consider repair and damages", detail: "Marbeck could instead require REPAIR if reasonable, or require Duncastle to supply 900 conforming bearings as performance of the balance. And in every case it keeps DAMAGES for the delay from 15 to 26 April." },
          ],
          result:
            "Marbeck cannot avoid, but has price reduction, repair or performance, plus damages for delay in every case. Two lessons: fixing an **additional period** is how a buyer manufactures a right to avoid out of a non-fundamental delay, and **damages are cumulative** — choosing price reduction or repair never costs the buyer its claim for the delay.",
        },
      ],
      check: {
        q: "A seller delivers three weeks late. The delay is inconvenient but not fundamental. What should the buyer do if it wants the option of walking away?",
        options: [
          "Avoid immediately, since any late delivery justifies avoidance",
          "Fix an additional period of reasonable length; if the seller misses it, the buyer may avoid even though the original breach was not fundamental",
          "Accept the goods and claim damages only",
          "Nothing — avoidance is impossible unless the breach is fundamental",
        ],
        correct: 1,
        explain:
          "FIX AN ADDITIONAL PERIOD of reasonable length. Missing that deadline gives a right to avoid without proving fundamental breach. During the period the buyer cannot resort to other remedies for the breach, but it does not lose damages for the delay.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Allowing avoidance for any breach.",
      fix: "Avoidance needs a FUNDAMENTAL breach, or failure to perform within an additional period the buyer fixed.",
    },
    {
      trap: "Treating fundamental breach as requiring only serious loss.",
      fix: "Both limbs are needed: substantial deprivation AND foreseeability of that result.",
    },
    {
      trap: "Forgetting that avoidance must be declared by notice.",
      fix: "It is never automatic, and after performance it must be declared within a reasonable time of learning of the breach.",
    },
    {
      trap: "Assuming a buyer who takes price reduction or repair loses its damages claim.",
      fix: "Damages are CUMULATIVE with every other remedy, including damages for delay where a cure is accepted.",
    },
    {
      trap: "Demanding substitute goods for a non-fundamental defect.",
      fix: "Substitute goods require a FUNDAMENTAL breach, plus timely examination and notice.",
    },
    {
      trap: "Overlooking the seller's right to cure.",
      fix: "The seller may remedy even after the delivery date if it acts without unreasonable delay and causes no unreasonable inconvenience — unless the buyer has already validly avoided.",
    },
  ],
  keyTerms: [
    { term: "Fundamental breach", def: "A breach substantially depriving the other party of what it was entitled to expect, where that result was foreseeable." },
    { term: "Avoidance", def: "Terminating the contract for fundamental breach or failure to perform within an additional period; effective only if declared by notice." },
    { term: "Additional period", def: "A reasonable further period the buyer fixes for performance, during which other remedies are suspended and after which avoidance becomes available." },
    { term: "Price reduction", def: "Reducing the price in the proportion the delivered goods' value bears to the value conforming goods would have had at delivery." },
    { term: "Substitute goods", def: "Replacement goods the buyer may demand only where the lack of conformity is a fundamental breach and notice was timely." },
    { term: "Right to cure", def: "The seller's right to remedy a failure at its own expense, even after the delivery date, if done without unreasonable delay or inconvenience." },
  ],
  summary: [
    "Fundamental breach requires substantial deprivation and foreseeability, and unlocks avoidance and substitute goods.",
    "Damages are available for any breach and are cumulative with every other remedy.",
    "The buyer may require performance, substitute goods for a fundamental breach, or repair where reasonable.",
    "Fixing an additional period suspends other remedies but creates a right to avoid if the seller misses it.",
    "Avoidance must be declared by notice, and after performance within a reasonable time of learning of the breach.",
    "Price reduction is proportionate to the value the delivered goods actually had at delivery.",
    "The seller may cure after the delivery date unless the buyer has already validly avoided.",
  ],
  knowledgeDiagnostic: [
    { q: "State both limbs of fundamental breach.", a: "Substantial deprivation of what the party was entitled to expect, and foreseeability of that result by the party in breach or a reasonable person in the same circumstances." },
    { q: "Which two remedies require a fundamental breach?", a: "Avoidance of the contract, and a demand for substitute goods." },
    { q: "How does fixing an additional period help a buyer facing a non-fundamental delay?", a: "If the seller fails to deliver within that reasonable additional period, the buyer may avoid the contract without proving fundamental breach." },
    { q: "How is a price reduction calculated?", a: "In the proportion the value of the goods actually delivered bore, at the time of delivery, to the value conforming goods would have had then." },
    { q: "Does accepting the seller's cure cost the buyer its damages?", a: "No. The buyer retains its right to damages for the delay even where cure is accepted." },
  ],
  furtherStudy: [
    "Chapter 11 mirrors this for the buyer's obligations and the seller's remedies.",
    "Chapter 12 covers damages, interest, exemption and the consequences of avoidance.",
  ],
}

/* ── Chapter 11 · B2(b) ────────────────────────────────────────── */

export const LWG_TREE_11: StudyChapter = {
  id: "LWG-11",
  number: 11,
  paper: "LW",
  area: "B",
  title: "The buyer's obligations and the seller's remedies",
  minutes: 15,
  syllabusRefs: ["B2(b)"],
  intro:
    "The structure mirrors the buyer's side almost exactly, which makes it quick to learn — and the one asymmetry, the seller's power to specify goods, is what gets examined.",
  outcomes: [
    "Explain the buyer's obligation to pay the price, including place, time and preconditions",
    "Explain the buyer's obligation to take delivery",
    "Identify the remedies available to the seller for the buyer's breach",
    "Explain when the seller may avoid the contract or fix an additional period",
    "Explain the seller's power to make the specification where the buyer fails to do so",
  ],
  sections: [
    {
      id: "buyers-obligations",
      heading: "The buyer's two obligations",
      blocks: [
        {
          kind: "definition",
          term: "Payment of the price",
          md: "The buyer must pay the price **at the time and place** the contract fixes. Failing agreement, it must pay when the seller places the goods **or the documents controlling their disposition** at the buyer's disposal, and payment is due at the **seller's place of business** or, where payment is against handing over the goods or documents, at the **place of handing over**. No request or formality by the seller is needed for the obligation to bite.",
        },
        {
          kind: "list",
          title: "Points on payment that decide questions",
          items: [
            "**The buyer may withhold payment until it has had an opportunity to examine** the goods — unless the agreed delivery or payment procedures are inconsistent with that, as they are under a documentary credit.",
            "**Where the price is fixed by weight**, and there is doubt, it is determined by the **net** weight.",
            "**Where no price is fixed**, the price is that generally charged at the time of conclusion for such goods sold in comparable circumstances.",
            "**Interest** runs on a sum in arrears without prejudice to any damages claim.",
            "**Taking delivery** means doing all the acts the buyer could reasonably be expected to do to enable the seller to make delivery, and then actually taking over the goods.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Documentary credit displaces the right to examine first",
          md: "A buyer paying under a documentary credit pays against **conforming documents**, not against satisfactory goods. So the general right to withhold payment until examination does not survive the parties' choice of that payment mechanism. This is where Area B and Area C meet, and it is a favourite scenario: the goods are defective, the documents are in order, and the bank must still pay.",
        },
      ],
      check: {
        q: "Goods are shipped under a documentary credit. On arrival the buyer finds them defective and instructs the bank not to pay. What is the position?",
        options: [
          "The bank must refuse payment, because the goods do not conform",
          "The bank pays against conforming documents; the buyer's remedy is against the seller, not through withholding payment",
          "The buyer may withhold payment until it has examined the goods in every case",
          "The credit is automatically cancelled by the non-conformity",
        ],
        correct: 1,
        explain:
          "The bank pays against CONFORMING DOCUMENTS. Choosing a documentary credit displaces the buyer's general right to withhold payment pending examination — the credit is independent of the sale. The buyer's remedy for the defective goods lies against the SELLER under the Convention.",
      },
    },
    {
      id: "sellers-remedies",
      heading: "The seller's remedies",
      blocks: [
        {
          kind: "table",
          caption: "The mirror image of chapter 10",
          head: ["Remedy", "Available when"],
          rows: [
            ["**Damages**", "Any breach; cumulative with the rest"],
            ["**Require performance**", "Any breach — require the buyer to pay, take delivery or perform its other obligations, unless the seller has resorted to an inconsistent remedy"],
            ["**Fix an additional period**", "A reasonable further period for the buyer to perform; other remedies are suspended during it, damages apart"],
            ["**Avoidance**", "The buyer's breach is **fundamental**, or the buyer does not pay or take delivery within an additional period fixed"],
            ["**Make the specification**", "Where the buyer was to specify form, measurement or other features and fails to do so"],
          ],
        },
        {
          kind: "definition",
          term: "The seller's power to specify",
          md: "Where the contract required the **buyer** to specify the form, measurement or other features of the goods, and the buyer fails to do so by the agreed date or within a reasonable time of a request, the **seller may make the specification itself** in accordance with the buyer's known requirements. It must **inform the buyer** of the details and fix a reasonable period for the buyer to make a different specification. If the buyer does not, the seller's specification **binds**.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Timing limits on the seller's avoidance too",
          md: "As with the buyer, once the buyer has **paid the price** the seller loses the right to avoid unless it does so **before it became aware** of the late performance, or within a **reasonable time** afterwards (or after an additional period expired). A seller who banks a late payment and then purports to avoid weeks later will usually be too late.",
        },
        {
          kind: "example",
          title: "Applying the seller's remedies",
          scenario:
            "Verdon Alloys (state P) contracts to supply 800 tonnes of aluminium sections to Rosthwaite Fabricators (state Q). Rosthwaite is to specify the profile dimensions by 1 February; the price is payable 30 days after delivery. Rosthwaite specifies nothing. On 8 February Verdon writes asking for the specification and hearing nothing, on 20 February it specifies the profile Rosthwaite has ordered on the last four occasions, notifies Rosthwaite of the details and gives it until 5 March to specify differently. Rosthwaite does not reply, and the sections are made and delivered on 20 March. Rosthwaite then refuses to pay, saying it never agreed the profile and the sections are useless to it.",
          steps: [
            { label: "Identify the buyer's breach", detail: "Rosthwaite was obliged to specify by 1 February and did not. That is a failure to perform an obligation under the contract." },
            { label: "Test Verdon's use of the specification power", detail: "The buyer failed to specify after a REQUEST. Verdon was therefore entitled to make the specification itself, in accordance with Rosthwaite's KNOWN REQUIREMENTS — its last four orders are exactly that evidence." },
            { label: "Check the procedural conditions", detail: "Verdon informed Rosthwaite of the DETAILS and fixed a REASONABLE PERIOD — 20 February to 5 March — for a different specification. Both conditions are met." },
            { label: "Apply the consequence", detail: "Rosthwaite did not specify differently within that period, so VERDON'S SPECIFICATION BINDS. The sections conform to the contract as validly specified." },
            { label: "Deal with the refusal to pay", detail: "Rosthwaite has no conformity complaint, because the profile is the contractual one. Its refusal to pay is itself a breach, and Verdon may require performance — payment — plus interest on the sum in arrears and damages." },
            { label: "Consider whether Verdon could avoid instead", detail: "It could fix an additional period for payment and avoid if that were missed, or avoid at once if non-payment amounted to a FUNDAMENTAL breach. But avoidance would be commercially poor here: Verdon wants the price for goods already made to a bespoke profile." },
          ],
          result:
            "Verdon recovers the price with interest. The point that decides it is the **specification power and its two conditions** — notify the details, and give a reasonable period to substitute a different specification. A seller who simply guesses the profile without following that procedure would be delivering non-conforming goods and would lose.",
        },
      ],
      check: {
        q: "A buyer fails to specify the dimensions it was contractually required to choose. What may the seller do?",
        options: [
          "Nothing — the contract is void for uncertainty",
          "Make the specification itself in accordance with the buyer's known requirements, notify the details and allow a reasonable period for a different specification",
          "Deliver whatever it likes and charge the contract price",
          "Avoid the contract immediately, with no alternative",
        ],
        correct: 1,
        explain:
          "The seller may MAKE THE SPECIFICATION itself, following two conditions: it must accord with the buyer's known requirements, and the seller must notify the details and fix a reasonable period for the buyer to specify differently. Only then does the seller's specification bind — guessing without the procedure delivers non-conforming goods.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Assuming the buyer can always withhold payment until it has examined the goods.",
      fix: "Not where the agreed delivery or payment procedures are inconsistent with it — a documentary credit is the standard example.",
    },
    {
      trap: "Thinking the seller needs to demand payment before the obligation arises.",
      fix: "No request or formality is needed. The price falls due under the contract or, failing agreement, when the goods or controlling documents are placed at the buyer's disposal.",
    },
    {
      trap: "Letting a seller specify the goods without following the procedure.",
      fix: "It must accord with the buyer's known requirements, notify the details, and allow a reasonable period for the buyer to substitute a specification.",
    },
    {
      trap: "Allowing the seller to avoid after accepting late payment.",
      fix: "Once the buyer has paid, avoidance must be declared before the seller knew of the late performance or within a reasonable time afterwards.",
    },
    {
      trap: "Forgetting interest on an overdue price.",
      fix: "Interest runs on any sum in arrears, without prejudice to a damages claim.",
    },
  ],
  keyTerms: [
    { term: "Payment of the price", def: "The buyer's obligation to pay at the contractual time and place, or failing agreement when the goods or controlling documents are placed at its disposal." },
    { term: "Taking delivery", def: "Doing the acts the buyer could reasonably be expected to do to enable delivery, and then taking over the goods." },
    { term: "Right to examine before payment", def: "The buyer's right to withhold payment until it has had an opportunity to examine, displaced where the agreed procedures — such as a documentary credit — are inconsistent." },
    { term: "Seller's power to specify", def: "The seller's right, where the buyer fails to specify features it was to choose, to specify in accordance with the buyer's known requirements after notifying details and allowing a reasonable period." },
  ],
  summary: [
    "The buyer must pay the price and take delivery, with no request or formality needed for payment to fall due.",
    "Failing agreement, payment is due when the goods or controlling documents are placed at the buyer's disposal.",
    "The right to examine before paying is displaced by a documentary credit, which pays against documents.",
    "The seller's remedies mirror the buyer's: damages, performance, an additional period, and avoidance for fundamental breach.",
    "Where the buyer fails to specify features it was to choose, the seller may specify subject to two procedural conditions.",
    "Once the buyer has paid, the seller's right to avoid is limited by the same reasonable-time constraint.",
  ],
  knowledgeDiagnostic: [
    { q: "Where and when is the price payable if the contract says nothing?", a: "When the seller places the goods or the documents controlling them at the buyer's disposal, at the seller's place of business or at the place of handing over." },
    { q: "Why can a buyer under a documentary credit not withhold payment for defective goods?", a: "Because the agreed payment procedure is inconsistent with the right to examine first — the credit pays against conforming documents, and the buyer's remedy is against the seller." },
    { q: "What are the two conditions on the seller's power to specify?", a: "The specification must accord with the buyer's known requirements, and the seller must notify the details and fix a reasonable period for the buyer to specify differently." },
    { q: "When may the seller avoid the contract?", a: "For the buyer's fundamental breach, or where the buyer fails to pay or take delivery within an additional period the seller fixed." },
    { q: "Does the seller need to demand payment before it falls due?", a: "No. No request or other formality is required." },
  ],
  furtherStudy: [
    "Chapter 12 covers damages, interest, exemption and the effects of avoidance for both parties.",
    "Chapter 16 explains the documentary credit mechanism this chapter refers to.",
  ],
}

/* ── Chapter 12 · B2(c) ────────────────────────────────────────── */

export const LWG_TREE_12: StudyChapter = {
  id: "LWG-12",
  number: 12,
  paper: "LW",
  area: "B",
  title: "Provisions common to both parties: breach, damages and avoidance",
  minutes: 17,
  syllabusRefs: ["B2(c)"],
  intro:
    "The rules that apply whichever party is in breach — how damages are measured, when a party may stop performing before the due date, what excuses a failure, and what happens once a contract is avoided.",
  outcomes: [
    "Explain anticipatory breach and the right to suspend performance",
    "Explain the rules on instalment contracts",
    "Calculate damages, including on avoidance with and without a substitute transaction",
    "Explain the duty to mitigate, and entitlement to interest",
    "Explain the exemption for an impediment beyond a party's control, and the effects of avoidance and the duty to preserve the goods",
  ],
  sections: [
    {
      id: "anticipatory-and-instalments",
      heading: "Anticipatory breach and instalment contracts",
      blocks: [
        {
          kind: "definition",
          term: "Suspension of performance",
          md: "A party may **suspend** its own performance where it becomes **apparent** after conclusion that the other will not perform a **substantial part** of its obligations — because of a serious deficiency in its ability to perform or its creditworthiness, or its conduct in preparing to perform. The suspending party must **immediately notify** the other, and must **continue** with performance if the other gives **adequate assurance**.",
        },
        {
          kind: "definition",
          term: "Anticipatory avoidance",
          md: "Where it is **clear** before the date for performance that a party **will commit a fundamental breach**, the other may **avoid** the contract. Unless time does not allow, it must give **reasonable notice** so the other can provide adequate assurance of performance.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Two thresholds, not one",
          md: "**Suspension** requires only that it be **apparent** the other will not perform a **substantial part** — a lower threshold, and a lesser step. **Avoidance** requires that it be **clear** the other **will commit a fundamental breach** — higher threshold, drastic step. Both require notice, and both are defeated by **adequate assurance**. A party that avoids on facts justifying only suspension is itself in breach.",
        },
        {
          kind: "table",
          caption: "Instalment contracts",
          head: ["Situation", "What may be avoided"],
          rows: [
            ["Fundamental breach **as to one instalment**", "**That instalment** only"],
            ["A breach as to one instalment giving **good grounds to conclude** a fundamental breach will occur as to **future** instalments", "**The future** instalments, if declared within a reasonable time"],
            ["Interdependent instalments, where a breach as to one destroys the value of deliveries already made or to come", "**Past and future** instalments together"],
          ],
        },
      ],
      check: {
        q: "A buyer learns its seller is in serious financial difficulty and may not be able to ship. Time for delivery has not yet arrived. What may the buyer do?",
        options: [
          "Avoid the contract immediately, since insolvency is a fundamental breach",
          "Suspend its own performance and notify the seller at once, continuing if the seller gives adequate assurance",
          "Nothing until the delivery date passes",
          "Demand substitute goods from a third party at the seller's expense",
        ],
        correct: 1,
        explain:
          "SUSPEND and notify immediately. Where it becomes apparent the other party will not perform a substantial part — including through a deficiency in creditworthiness — suspension is the proportionate step. Avoidance needs it to be CLEAR that a FUNDAMENTAL breach will occur, a higher threshold; and adequate assurance defeats both.",
      },
    },
    {
      id: "damages",
      heading: "Damages, mitigation and interest",
      blocks: [
        {
          kind: "definition",
          term: "The measure of damages",
          md: "Damages for breach are the **loss, including loss of profit**, suffered as a consequence — but limited to the loss the party in breach **foresaw or ought to have foreseen** at the time of conclusion, in the light of the facts it then knew or ought to have known. Foreseeability is judged at **contract date**, not at breach.",
        },
        {
          kind: "table",
          caption: "Damages where the contract is avoided",
          head: ["Situation", "Measure"],
          rows: [
            ["The aggrieved party has made a **substitute transaction** — bought in or resold", "**Article 75** — \"the difference between the contract price and the price in the substitute transaction\", plus any further damages"],
            ["**No substitute transaction**, but the goods have a **current price**", "**Article 76** — \"the difference between the contract price and the current price\" at the time of avoidance, plus any further damages"],
            ["Goods **taken over** before avoidance", "The current price at the time of **taking over** is used instead of the price at avoidance"],
          ],
        },
        {
          kind: "list",
          title: "Mitigation and interest",
          items: [
            "**Mitigation.** A party claiming breach must take **reasonable measures** to mitigate its loss. If it does not, the party in breach may claim a **reduction** in damages by the amount by which the loss should have been reduced.",
            "**Interest.** If a party fails to pay the price or any other sum in arrears, the other is entitled to **interest** on it — **without prejudice** to any claim for damages. So interest is additional, not alternative.",
          ],
        },
        {
          kind: "example",
          title: "Computing damages after avoidance",
          scenario:
            "Kelnor Metals agrees to sell 300 tonnes of copper to Brimwood Cables at $8,200 a tonne, delivery in September. In August Kelnor tells Brimwood it will not deliver at all. Brimwood avoids the contract by notice on 20 August, when the market price is $8,900 a tonne. It buys 300 tonnes elsewhere on 5 September at $9,100 a tonne, having spent $14,000 on urgent freight to keep its own production running. Kelnor knew when contracting that Brimwood used the copper in a continuous cable line.",
          steps: [
            { label: "Establish the right to avoid", detail: "Kelnor's statement that it will not deliver makes it CLEAR that a fundamental breach will occur, so Brimwood was entitled to avoid in advance and did so by notice." },
            { label: "Identify which measure applies", detail: "Brimwood made a SUBSTITUTE TRANSACTION — it bought in on 5 September. So the substitute-transaction measure applies, not the current-price measure." },
            { label: "Compute the primary loss", detail: "Substitute price $9,100 less contract price $8,200 = $900 a tonne × 300 tonnes = $270,000." },
            { label: "Test whether the purchase was reasonable", detail: "Brimwood must MITIGATE. Buying at $9,100 when the market was $8,900 on the avoidance date needs justification — urgency may supply it, but if a reasonable buyer could have bought at $8,900, Kelnor can seek a reduction of $200 × 300 = $60,000." },
            { label: "Add further damages", detail: "The $14,000 of urgent freight is recoverable as FURTHER damages if it was foreseeable — and it was, because Kelnor knew at contract date about the continuous cable line." },
            { label: "State the total", detail: "$270,000 plus $14,000 = $284,000, subject to any mitigation reduction, plus interest on sums in arrears." },
          ],
          result:
            "Around $284,000, exposed to a mitigation argument on the $60,000 difference between the market and the price actually paid. Three points decide this class of question: the **substitute-transaction measure displaces the current-price measure** once a substitute is made; **foreseeability is judged at contract date**, which is why Kelnor's knowledge of the cable line matters; and **mitigation** is the defendant's route to reducing the figure.",
        },
      ],
      check: {
        q: "A buyer avoids for the seller's fundamental breach and does NOT buy substitute goods, though the goods have a current market price. How are damages measured?",
        options: [
          "It recovers nothing, having made no substitute purchase",
          "Article 76 — \"the difference between the contract price and the current price\" at the time of avoidance, plus any further damages",
          "The difference between the contract price and the price at the original delivery date",
          "Its lost profits only, with no price differential",
        ],
        correct: 1,
        explain:
          "The CURRENT-PRICE measure applies: contract price against the current price AT AVOIDANCE, plus further damages. Making no substitute purchase does not bar recovery — but if the goods were taken over before avoidance, the current price at the time of TAKING OVER is used instead.",
      },
    },
    {
      id: "exemption-avoidance-preservation",
      heading: "Exemption, the effects of avoidance, and preserving the goods",
      blocks: [
        {
          kind: "definition",
          term: "Exemption for an impediment",
          md: "A party is **not liable** for a failure to perform if it proves the failure was due to an **impediment beyond its control**, which it could **not reasonably have been expected to take into account** at conclusion or to **avoid or overcome**. The exemption lasts only for the **period** of the impediment, and the party must **notify** the other of the impediment and its effect — failing which it is **liable in damages for the loss caused by the non-receipt** of that notice.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Exemption does not excuse everything",
          md: "Two limits catch candidates out. It excuses **damages**, but does **not** prevent the other party exercising any other right — including **avoidance** or **price reduction**. And where the failure is due to a **third party the seller engaged** to perform, the seller is exempt only if it is exempt **and** that third party would be too. So subcontractor failure is rarely a complete answer.",
        },
        {
          kind: "list",
          style: "number",
          title: "The effects of avoidance",
          items: [
            "It **releases both parties** from their obligations, subject to any damages due.",
            "It does **not affect** any contract provision on **dispute settlement**, or any other provision governing the parties' rights and obligations **consequent upon avoidance** — so the arbitration clause survives.",
            "A party that has performed may **claim restitution** of what it has supplied or paid; if both must restore, they must do so **concurrently**.",
            "A buyer who has had the benefit of the goods must **account for benefits** derived from them.",
            "The buyer **loses the right to avoid or demand substitute goods** if it cannot make restitution of the goods substantially in the condition received — subject to exceptions where the impossibility is not its fault, or the goods perished through the examination, or were resold or consumed in the ordinary course before the defect was discovered.",
          ],
        },
        {
          kind: "definition",
          term: "Preservation of the goods",
          md: "A party in possession or control of goods must take **reasonable steps to preserve** them where the other has delayed. A **seller** still holding the goods may retain them until **reimbursed** its reasonable expenses; a **buyer** who has received them and intends to reject must take reasonable steps to preserve them, and may **retain** them until reimbursed. Either may **store** them in a warehouse at the other's expense, and may **sell** them by appropriate means where there is unreasonable delay or preservation costs are disproportionate — and **must** sell where the goods are subject to **rapid deterioration**.",
        },
      ],
      check: {
        q: "A seller cannot ship because a sudden export ban is imposed, which it could not have foreseen. It says nothing to the buyer for six weeks. What is the position?",
        options: [
          "It is exempt from all liability, and notice is irrelevant",
          "It is exempt from damages for the non-delivery, but liable in damages for the loss caused by failing to notify — and the buyer may still avoid",
          "The exemption fails entirely because it did not notify",
          "The contract is automatically avoided by the ban",
        ],
        correct: 1,
        explain:
          "The impediment exempts it from DAMAGES for the failure to deliver, but it must NOTIFY — and is liable for the loss caused by the buyer not receiving that notice. Exemption also does not stop the buyer exercising other rights, including AVOIDANCE. The contract is not avoided automatically.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating suspension and anticipatory avoidance as the same threshold.",
      fix: "Suspension needs it APPARENT that a SUBSTANTIAL PART will not be performed. Avoidance needs it CLEAR that a FUNDAMENTAL breach will occur.",
    },
    {
      trap: "Judging foreseeability of loss at the date of breach.",
      fix: "It is judged at the date the CONTRACT was concluded, on the facts then known or knowable.",
    },
    {
      trap: "Using the current-price measure where a substitute transaction was made.",
      fix: "A substitute transaction displaces it: contract price against the substitute price, plus further damages.",
    },
    {
      trap: "Treating an impediment as excusing everything.",
      fix: "It exempts from DAMAGES only, for the period of the impediment, and does not bar avoidance or price reduction. Notice is also required.",
    },
    {
      trap: "Assuming subcontractor failure exempts the seller.",
      fix: "The seller is exempt only if BOTH it and the third party it engaged would be exempt.",
    },
    {
      trap: "Saying avoidance destroys the arbitration clause.",
      fix: "Avoidance does not affect provisions on dispute settlement or those governing rights consequent upon avoidance.",
    },
    {
      trap: "Forgetting the duty to preserve goods after a rejection.",
      fix: "The party in possession must take reasonable steps to preserve, may retain until reimbursed, and MUST sell goods subject to rapid deterioration.",
    },
  ],
  keyTerms: [
    { term: "Suspension of performance", def: "Stopping one's own performance where it becomes apparent the other will not perform a substantial part, with immediate notice and subject to adequate assurance." },
    { term: "Anticipatory avoidance", def: "Avoiding before the performance date where it is clear the other will commit a fundamental breach, on reasonable notice where time allows." },
    { term: "Foreseeability limit", def: "The cap on damages at the loss the party in breach foresaw or ought to have foreseen at the time the contract was concluded." },
    { term: "Substitute transaction measure", def: "Damages measured as the difference between the contract price and the price obtained or paid in a reasonable substitute transaction." },
    { term: "Mitigation", def: "The claimant's duty to take reasonable measures to reduce its loss, failing which damages are reduced accordingly." },
    { term: "Exemption for an impediment", def: "Relief from damages where a failure is due to an unforeseeable impediment beyond a party's control that it could not avoid or overcome, subject to notice." },
    { term: "Preservation of goods", def: "The duty on the party in possession to take reasonable steps to preserve goods, with rights to retain until reimbursed, store or sell." },
  ],
  summary: [
    "Suspension needs it apparent a substantial part will not be performed; anticipatory avoidance needs a clear future fundamental breach.",
    "Both require notice and are defeated by adequate assurance.",
    "Instalment contracts allow avoidance of one instalment, of future instalments, or of past and future where they are interdependent.",
    "Damages cover loss including lost profit, capped by foreseeability judged at contract date.",
    "A substitute transaction fixes the measure; failing one, the current price at avoidance is used.",
    "Mitigation reduces recoverable damages, and interest on arrears is additional to them.",
    "An impediment exempts from damages only, requires notice, and does not bar avoidance; avoidance preserves the dispute-settlement clause.",
  ],
  knowledgeDiagnostic: [
    { q: "Distinguish the thresholds for suspension and anticipatory avoidance.", a: "Suspension: it is apparent the other will not perform a substantial part. Avoidance: it is clear the other will commit a fundamental breach." },
    { q: "When is foreseeability of loss judged?", a: "At the time the contract was concluded, on the facts the party in breach then knew or ought to have known." },
    { q: "How are damages measured if the aggrieved party buys in substitute goods?", a: "The difference between the contract price and the substitute price, plus any further damages — subject to mitigation." },
    { q: "What does the exemption for an impediment actually excuse?", a: "Damages, for the period of the impediment. It does not bar avoidance or price reduction, and notice must still be given." },
    { q: "Does avoidance destroy an arbitration clause in the contract?", a: "No. Avoidance does not affect provisions on dispute settlement or those governing rights consequent upon avoidance." },
  ],
  furtherStudy: [
    "Chapter 13 completes Area B with the passing of risk.",
    "Chapter 5 explains why the arbitration clause surviving avoidance matters so much.",
  ],
}

/* ── Chapter 13 · B2(d) ────────────────────────────────────────── */

export const LWG_TREE_13: StudyChapter = {
  id: "LWG-13",
  number: 13,
  paper: "LW",
  area: "B",
  title: "The passing of risk",
  minutes: 15,
  syllabusRefs: ["B2(d)"],
  intro:
    "The most examined single point in Area B, because it decides who pays when goods are lost or damaged and nobody is at fault.",
  outcomes: [
    "Explain the consequence of risk having passed to the buyer",
    "Apply the rules on passing of risk where the contract involves carriage",
    "Apply the rule for goods sold in transit",
    "Apply the rule where the contract does not involve carriage",
    "Explain the identification requirement, and the effect of the seller's fundamental breach on risk",
  ],
  sections: [
    {
      id: "consequence",
      heading: "What passing of risk means",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The whole point in one sentence",
          md: "**Loss of or damage to the goods after risk has passed to the buyer does not discharge the buyer from its obligation to pay the price** — unless the loss is due to an act or omission of the seller. So once risk has passed, the buyer pays for goods it may never receive, and its protection is insurance.",
        },
        {
          kind: "list",
          title: "Three things risk is NOT",
          items: [
            "**Not ownership.** Property in the goods passes under the applicable domestic law, and can pass at a quite different moment.",
            "**Not the cost of carriage.** A C-group Incoterm puts freight on the seller while risk passes on shipment (chapter 8).",
            "**Not conformity.** Risk fixes the moment at which conformity is judged, but a defect existing when risk passed remains the seller's responsibility (chapter 9).",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "An Incoterm displaces these rules",
          md: "The rules below are the Convention's **defaults**. Where the parties have adopted an Incoterm, that term settles the passing of risk instead — as the parties are entitled to do. So the first question in any risk problem is: **is there an Incoterm?** Only if there is not do you reach for the articles.",
        },
      ],
    },
    {
      id: "the-rules",
      heading: "The three situations",
      blocks: [
        {
          kind: "table",
          caption: "Where the contract involves carriage",
          head: ["Situation", "Risk passes"],
          rows: [
            ["The seller is **not bound to hand the goods over at a particular place**", "When the goods are handed to the **first carrier** for transmission to the buyer"],
            ["The seller **is bound to hand them to a carrier at a particular place**", "When they are handed to the carrier **at that place**"],
            ["Either way — art 67(2)", "**Not** until \"the goods are clearly identified to the contract\" — by markings, shipping documents, notice to the buyer or otherwise"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Retaining the documents does not retain the risk",
          md: "The seller's retention of documents controlling the disposition of the goods **does not affect** the passing of risk. So a seller who holds back the bill of lading pending payment has kept **control**, but risk has still passed. Candidates routinely assume the two move together; they do not.",
        },
        {
          kind: "table",
          caption: "Goods sold in transit, and contracts not involving carriage",
          head: ["Situation", "Risk passes"],
          rows: [
            ["**Goods sold in transit** (general rule)", "**From the time the contract is concluded**"],
            ["Goods sold in transit, **if circumstances so indicate**", "From the time the goods were handed over to the **carrier who issued the documents** of carriage"],
            ["Goods sold in transit where, **at conclusion**, the seller **knew or ought to have known** the goods had been lost or damaged and did not disclose it", "**The seller** bears that loss or damage"],
            ["**No carriage**: buyer takes over the goods", "When the buyer **takes over** the goods"],
            ["**No carriage**: buyer is in breach by not taking over goods placed at its disposal", "From the time the goods are **placed at its disposal** and it commits a breach by failing to take delivery"],
            ["Goods **at a place other than the seller's** place of business", "When delivery is due **and** the buyer is aware the goods are placed at its disposal there"],
          ],
        },
        {
          kind: "example",
          title: "Working three risk problems",
          scenario:
            "Three sales, none of which adopts an Incoterm, all between parties in contracting states.\n\n(1) Aldermere sells 40 pallets of tinned fruit to Byrne, to be sent by road and rail. Aldermere hands them to a road haulier on 3 May, marked with Byrne's order number. A fire destroys them on the rail leg on 9 May.\n\n(2) Castleford buys a cargo of grain already at sea, the contract concluded on 12 June. Unknown to Castleford, the vessel had suffered water ingress on 8 June damaging part of the cargo — which Castleford's seller knew about and did not mention.\n\n(3) Dunmoor sells a machine to Everly, to be collected from Dunmoor's works. Dunmoor tells Everly on 1 July that it is ready. Everly does not collect. On 14 July the machine is damaged by a roof leak.",
          steps: [
            { label: "(1) Identify the situation", detail: "The contract INVOLVES CARRIAGE and Aldermere is not bound to hand over at a particular place. So risk passed when the goods were handed to the FIRST CARRIER — the road haulier — on 3 May." },
            { label: "(1) Check identification", detail: "The pallets were marked with Byrne's order number, so they were CLEARLY IDENTIFIED to the contract. Risk passed on 3 May and the 9 May fire is BYRNE's loss: it must pay the price." },
            { label: "(2) Identify the situation", detail: "GOODS SOLD IN TRANSIT. On the general rule risk passes on conclusion, 12 June, so damage on 8 June would fall on the seller. But where circumstances so indicate, risk runs from handover to the carrier who issued the carriage documents — which would instead put the 8 June damage on the buyer." },
            { label: "(2) Apply the seller's knowledge exception", detail: "It is unnecessary to resolve that, because the seller KNEW of the damage at conclusion and did not disclose it. That loss is borne by the SELLER whichever route the general rules would have taken." },
            { label: "(3) Identify the situation", detail: "NO CARRIAGE, and the goods were placed at Everly's disposal at Dunmoor's works and Everly was told. Everly commits a breach by failing to take delivery." },
            { label: "(3) Apply the rule", detail: "Risk passed when the goods were placed at Everly's disposal and it breached by not collecting. The 14 July roof damage is EVERLY's loss and it must pay the price." },
          ],
          result:
            "Buyer, seller, buyer. The reasoning is always the same three-step: **is there an Incoterm?** — if not, **which of the three situations is this?** — then **has the identification requirement been met?** Case (2) shows the one rule that overrides the mechanics: a seller who knows the goods are already damaged and stays silent cannot pass that loss on.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Fundamental breach preserves the buyer's remedies",
          md: "Where the seller has committed a **fundamental breach**, the risk rules **do not impair** the remedies available to the buyer on account of that breach. So a buyer who receives non-conforming goods that are then destroyed is not deprived of its remedies merely because risk had passed — the two questions are separate, and a scenario combining a defect with a later loss is testing whether you keep them apart.",
        },
      ],
      check: {
        q: "A seller hands identified goods to the first carrier but retains the bill of lading until payment. The goods are lost in transit. Who bears the loss?",
        options: [
          "The seller, because it retained the document controlling the goods",
          "The buyer, because retention of documents does not affect the passing of risk",
          "The carrier, in every case",
          "Neither — the contract is automatically avoided",
        ],
        correct: 1,
        explain:
          "The BUYER. Risk passed on handing the identified goods to the first carrier, and the seller's retention of documents controlling their disposition expressly DOES NOT affect that. Retaining the document keeps control, not risk — a distinction candidates routinely collapse.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Reaching for the Convention's articles when the contract adopts an Incoterm.",
      fix: "The Incoterm governs the passing of risk. The articles are defaults the parties may displace.",
    },
    {
      trap: "Assuming risk stays with the seller while it holds the bill of lading.",
      fix: "Retention of documents controlling disposition does NOT affect the passing of risk.",
    },
    {
      trap: "Passing risk on unidentified goods.",
      fix: "Article 67(2): risk does not pass until \"the goods are clearly identified to the contract\", by markings, documents or notice.",
    },
    {
      trap: "Treating risk and ownership as the same thing.",
      fix: "Risk is governed by the Convention or the Incoterm; property passes under domestic law, possibly at a different moment.",
    },
    {
      trap: "Letting the seller pass on a loss it knew about.",
      fix: "For goods sold in transit, a seller who knew or ought to have known of loss or damage at conclusion and did not disclose it bears that loss.",
    },
    {
      trap: "Thinking passing of risk defeats a buyer's remedies for a defect.",
      fix: "Where the seller is in fundamental breach, the risk rules do not impair the buyer's remedies for it.",
    },
  ],
  keyTerms: [
    { term: "Passing of risk", def: "The moment from which loss of or damage to the goods no longer discharges the buyer from paying the price." },
    { term: "First carrier rule", def: "Where carriage is involved and no particular handover place is fixed, risk passes when the goods are handed to the first carrier." },
    { term: "Identification to the contract", def: "The requirement that goods be clearly identified — by markings, documents or notice — before risk can pass." },
    { term: "Goods sold in transit", def: "Goods already in carriage when sold, where risk generally passes on conclusion of the contract." },
    { term: "Retention of documents", def: "The seller's holding back of documents controlling disposition, which preserves control but does not affect the passing of risk." },
  ],
  summary: [
    "Once risk has passed, loss or damage does not discharge the buyer from paying, unless caused by the seller.",
    "An Incoterm displaces the Convention's default risk rules, so look for one first.",
    "Where carriage is involved, risk passes on handing the goods to the first carrier, or at the agreed handover place.",
    "Risk cannot pass until the goods are clearly identified to the contract.",
    "Goods sold in transit pass risk on conclusion, or from the carrier handover if circumstances indicate.",
    "A seller who knew of existing loss and did not disclose it bears that loss.",
    "Where there is no carriage, risk passes on taking over, or when goods are placed at the buyer's disposal and it breaches by not collecting.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the consequence of risk having passed to the buyer?", a: "Loss or damage does not discharge the buyer from paying the price, unless the loss was due to an act or omission of the seller." },
    { q: "When does risk pass where carriage is involved and no handover place is fixed?", a: "When the goods are handed to the first carrier for transmission to the buyer — provided they are clearly identified to the contract." },
    { q: "Does retaining the bill of lading keep risk with the seller?", a: "No. Retention of documents controlling disposition does not affect the passing of risk." },
    { q: "When does risk pass on goods sold in transit?", a: "On conclusion of the contract as a general rule, or from handover to the carrier who issued the carriage documents if the circumstances so indicate." },
    { q: "How does a seller's fundamental breach interact with the risk rules?", a: "The risk rules do not impair the buyer's remedies for that breach — the two questions stay separate." },
  ],
  furtherStudy: [
    "Chapter 8's Incoterms displace these rules whenever the parties adopt one.",
    "Chapter 9 uses the moment risk passes to judge conformity.",
    "Chapter 14 covers the bill of lading that identifies the goods and evidences shipment.",
  ],
}

/** Chapters 6–13 — LW-Global Area B, in reading order. */
export const LWG_TREE_AREA_B: StudyChapter[] = [
  LWG_TREE_06,
  LWG_TREE_07,
  LWG_TREE_08,
  LWG_TREE_09,
  LWG_TREE_10,
  LWG_TREE_11,
  LWG_TREE_12,
  LWG_TREE_13,
]
