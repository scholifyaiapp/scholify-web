import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area B, first part — the formation of a contract.
 * Chapters 7–12 of the LW-ENG reading tree, mapped to syllabus group B1.
 *
 * ── No Global counterpart ──────────────────────────────────────
 * LW-Global's Area B is the CISG and the ICC Incoterms — a uniform international sales
 * regime. ENG's Area B is the ENGLISH law of obligations: common law contract built
 * from decided cases, then tort. Nothing here can be forked from the Global tree, and
 * the differences are substantive rather than cosmetic. English law needs
 * consideration and has a postal rule; the CISG has neither.
 *
 * ── How these chapters are built ───────────────────────────────
 * English contract law IS its cases, so each rule is stated as a `definition` and then
 * anchored to the decision that settled it. Case names are used as legal citations —
 * the authority for a proposition — never as a source of prose. Every chapter ends on
 * a worked `example` that runs the rule against facts and reaches a conclusion, which
 * is what the examiner actually rewards.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 7 · B1(a) ─────────────────────────────────────────── */

export const LWE_TREE_07: StudyChapter = {
  id: "LWE-07",
  number: 7,
  paper: "LW",
  area: "B",
  title: "The nature of a simple contract",
  minutes: 15,
  syllabusRefs: ["B1(a)"],
  intro:
    "A contract needs six things, and a question that looks impossibly open is usually just asking which one of the six is missing. Learn the checklist and most formation problems answer themselves.",
  outcomes: [
    "List the essential elements of a valid simple contract",
    "Explain that most contracts need no particular form, and identify the exceptions",
    "Distinguish void, voidable and unenforceable contracts",
    "Explain the effect of a lack of capacity",
    "Run the six-element checklist against given facts",
  ],
  sections: [
    {
      id: "the-elements",
      heading: "The six essential elements",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "What every valid contract needs",
            caption: "Miss any one and there is no enforceable contract.",
            data: {
              items: [
                { title: "Offer", sub: "A definite promise to be bound on specified terms" },
                { title: "Acceptance", sub: "Unqualified agreement to those terms, communicated" },
                { title: "Consideration", sub: "Something of value moving from each side" },
                { title: "Intention", sub: "An intention to create legal relations" },
                { title: "Capacity", sub: "Legal ability to contract" },
                { title: "Legality", sub: "A purpose the law will enforce" },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "Simple contract",
          md: "A contract that requires **no particular form**. It may be made in writing, **orally**, or **by conduct**, and it is as binding either way. So an oral agreement in a corridor is a contract if the six elements are present, and the absence of paperwork is a problem of **proof**, not of validity.",
        },
        {
          kind: "table",
          caption: "The exceptions, where form does matter",
          head: ["Contract", "Form required"],
          rows: [
            ["**Sale or other disposition of land**", "Must be **in writing**, incorporating all the terms and signed by or for each party"],
            ["**Leases** over three years", "Must be made by **deed**"],
            ["**Guarantees**", "Must be **evidenced in writing** and signed"],
            ["**Transfer of shares**", "Requires a **written instrument** of transfer"],
            ["**Consumer credit** agreements", "Must be in a **statutorily prescribed form**"],
            ["A promise with **no consideration**", "Only binding if made by **deed**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "A deed is how a gratuitous promise becomes binding",
          md: "English law will not enforce a bare promise, because there is no consideration for it (chapter 11). A **deed** is the way round: a document signed, witnessed and delivered as a deed is binding **without consideration**. That is why a charitable covenant or a gift of a promise is put in a deed, and it is the reason the last row of the table above exists.",
        },
      ],
      check: {
        q: "Two businesses agree a supply contract orally over lunch, and both begin performing. Is there a contract?",
        options: [
          "No, because a business contract must be in writing",
          "Yes — a simple contract needs no particular form, so it binds if the six elements are present",
          "No, unless the agreement is later confirmed in writing",
          "Only once the first payment has been made",
        ],
        correct: 1,
        explain:
          "YES. A simple contract requires NO PARTICULAR FORM and can be made orally or even by conduct. Writing matters only for the specific exceptions — land, leases over three years, guarantees, share transfers and consumer credit. The absence of a document is an evidential difficulty, not a defect in validity.",
      },
    },
    {
      id: "validity-capacity",
      heading: "Void, voidable and unenforceable — and capacity",
      blocks: [
        {
          kind: "table",
          caption: "Three ways a contract can be defective, with different consequences",
          head: ["Status", "What it means", "Effect on a third party who bought the goods"],
          rows: [
            ["**Void**", "**No contract ever existed** — the law treats it as nothing. Arises from a fundamental mistake, or illegality", "**No title passes**, so the third party gets nothing and the original owner can recover the goods"],
            ["**Voidable**", "A contract **valid until avoided** by the party entitled to escape it — misrepresentation, duress, undue influence, or a minor's contract", "Title **does** pass, so a third party buying **in good faith before avoidance** keeps the goods"],
            ["**Unenforceable**", "A valid contract that a **court will not enforce**, usually for want of required form or evidence", "The contract stands but neither party can compel performance through the courts"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Void against voidable decides who keeps the goods",
          md: "This distinction is regularly worth a mark on its own. If a rogue induces a sale by **fraudulent misrepresentation**, the contract is **voidable** — so title passes, and if the rogue resells to an innocent buyer **before** the seller avoids the contract, the innocent buyer keeps the goods and the seller's remedy is against the rogue. If instead the contract were **void**, no title ever passed and the seller could recover the goods from the innocent buyer. Scenarios turn on the **timing** of the avoidance.",
        },
        {
          kind: "table",
          caption: "Capacity",
          head: ["Party", "The position"],
          rows: [
            ["**Minors** (under 18)", "Bound by contracts for **necessaries** and for **beneficial contracts of service**. Other contracts are generally **voidable** at the minor's option, so the minor may escape them but the adult cannot"],
            ["**Persons lacking mental capacity**", "A contract is **voidable** if the person did not understand it **and** the other party knew or ought to have known that"],
            ["**Intoxicated persons**", "Treated in the same way as those lacking mental capacity"],
            ["**Companies**", "Have capacity under their constitution; a third party dealing in good faith is generally protected against a constitutional limit on the directors' powers (chapter 37)"],
          ],
        },
        {
          kind: "example",
          title: "Running the checklist",
          scenario:
            "Ferrow, aged 17 and an apprentice electrician, orally agrees to buy a set of professional hand tools from Marnock for £600, paying £200 down. He also agrees orally to buy Marnock's lock-up garage for £14,000, paying a £500 deposit. Marnock then refuses to proceed with either. Separately, Marnock had earlier sold a van to Ferrow's employer after falsely stating it had a new engine; the employer has since resold the van to an innocent buyer.",
          steps: [
            { label: "Test the tools contract for form", detail: "Goods, sold orally — a SIMPLE contract needing no particular form. Form is no obstacle." },
            { label: "Test the tools contract for capacity", detail: "Ferrow is a MINOR, but the tools are for his trade as an apprentice electrician, so this is arguably a contract for NECESSARIES or a BENEFICIAL CONTRACT OF SERVICE. On that basis it BINDS him — and it certainly binds Marnock, since a minor's incapacity does not release the adult." },
            { label: "Test the garage contract for form", detail: "This is a DISPOSITION OF LAND, which must be IN WRITING incorporating all the terms and signed. An oral agreement plus a deposit does not satisfy that, so the contract is UNENFORCEABLE — Ferrow cannot compel the sale, whatever the deposit." },
            { label: "Classify the van contract", detail: "The false statement about the engine is a MISREPRESENTATION, which makes the contract VOIDABLE, not void. Title therefore PASSED to Ferrow's employer." },
            { label: "Resolve the third-party position", detail: "Because the contract was only voidable and title passed, the INNOCENT BUYER who purchased before avoidance KEEPS the van. Marnock's misrepresentation gives the employer a claim against Marnock, not a right to unpick the resale." },
          ],
          result:
            "The tools contract is **binding**, the garage contract is **unenforceable for want of writing**, and the innocent buyer **keeps the van** because misrepresentation makes a contract voidable rather than void. Three different outcomes from one checklist.",
        },
      ],
      check: {
        q: "A seller is induced to sell by fraudulent misrepresentation. Before he avoids the contract, the buyer resells to an innocent third party. Who owns the goods?",
        options: [
          "The original seller, since the contract was procured by fraud",
          "The innocent third party — misrepresentation makes the contract voidable, so title passed before avoidance",
          "Nobody, as the contract was void from the outset",
          "The original seller, provided he avoids within a reasonable time",
        ],
        correct: 1,
        explain:
          "The INNOCENT THIRD PARTY. Misrepresentation makes a contract VOIDABLE, not void, so it was valid until avoided and TITLE PASSED to the buyer. A good-faith purchaser who buys BEFORE avoidance keeps the goods, and the seller's remedy lies against the fraudster. Had the contract been VOID, no title would ever have passed.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying a business contract must be in writing to bind.",
      fix: "A simple contract needs no form. Writing is required only for land, leases over three years, guarantees, share transfers and consumer credit.",
    },
    {
      trap: "Using void and voidable interchangeably.",
      fix: "Void means no contract ever existed and no title passes; voidable means valid until avoided, so title passes and a good-faith buyer is protected.",
    },
    {
      trap: "Treating a minor's incapacity as releasing the adult too.",
      fix: "The contract is voidable at the MINOR'S option. The adult party remains bound.",
    },
    {
      trap: "Enforcing a bare promise because it was clearly meant seriously.",
      fix: "Without consideration a promise binds only if made by DEED.",
    },
  ],
  keyTerms: [
    { term: "Simple contract", def: "A contract needing no particular form; may be made in writing, orally or by conduct." },
    { term: "Deed", def: "A document signed, witnessed and delivered as a deed, which binds even without consideration." },
    { term: "Void contract", def: "No contract ever existed; no title can pass under it." },
    { term: "Voidable contract", def: "Valid until avoided by the party entitled to escape it, so title passes in the meantime." },
    { term: "Unenforceable contract", def: "A valid contract the court will not enforce, usually for want of required form." },
    { term: "Necessaries", def: "Goods and services suitable to a minor's condition in life, for which a minor is bound." },
  ],
  summary: [
    "A valid contract needs offer, acceptance, consideration, intention, capacity and legality.",
    "Most contracts need no form; land, leases over three years, guarantees, share transfers and consumer credit are the exceptions.",
    "A promise without consideration binds only if made by deed.",
    "Void means no contract and no title; voidable means valid until avoided, so a good-faith buyer is protected.",
    "A minor is bound by contracts for necessaries and beneficial contracts of service; other contracts are voidable at the minor's option.",
  ],
  knowledgeDiagnostic: [
    { q: "List the six essential elements of a valid contract.", a: "Offer, acceptance, consideration, intention to create legal relations, capacity and legality." },
    { q: "Which contracts must be in writing?", a: "Dispositions of land, guarantees (evidenced in writing), share transfers and consumer credit agreements; leases over three years must be by deed." },
    { q: "Why does void or voidable decide a third party's position?", a: "Under a void contract no title ever passes, so the owner recovers the goods. Under a voidable contract title passes, so a good-faith buyer before avoidance keeps them." },
    { q: "How can a gratuitous promise be made binding?", a: "By making it in a deed, which dispenses with the need for consideration." },
  ],
}

/* ── Chapter 8 · B1(b) ─────────────────────────────────────────── */

export const LWE_TREE_08: StudyChapter = {
  id: "LWE-08",
  number: 8,
  paper: "LW",
  area: "B",
  title: "Offer, and the invitation to treat",
  minutes: 16,
  syllabusRefs: ["B1(b)"],
  intro:
    "Whoever makes the offer loses control of whether a contract comes into being — so the whole commercial point of a shop display, an advertisement or a tender is to invite offers rather than make one. Telling the two apart is the most heavily tested point in Area B.",
  outcomes: [
    "Define an offer and distinguish it from an invitation to treat",
    "Classify displays, advertisements, auctions and tenders correctly",
    "Distinguish an offer from a mere supply of information",
    "Explain a unilateral offer and how it is accepted",
    "Decide on given facts who made the offer and who accepted",
  ],
  sections: [
    {
      id: "offer-vs-itt",
      heading: "Offer, invitation to treat, and why the difference matters",
      blocks: [
        {
          kind: "definition",
          term: "Offer",
          md: "A **definite promise to be bound** on specified terms, made with the intention that it becomes binding **as soon as it is accepted**. The person making it is the **offeror**; the person to whom it is made is the **offeree**.",
        },
        {
          kind: "definition",
          term: "Invitation to treat",
          md: "An indication that a person is **willing to receive offers** — a step in negotiations, not a promise capable of acceptance. It cannot be accepted, so no contract results from responding to it. The response is itself an **offer**, which the other party is free to accept or refuse.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why a shop wants to be making an invitation, not an offer",
          md: "If displaying goods were an **offer**, a customer's acceptance would form a contract instantly — and the shop would be bound to sell at a mispriced ticket, and bound to sell its last item to everyone who accepted. Treating the display as an **invitation to treat** puts the shop in the position of **offeree**: the customer offers at the till and the shop can decline. That commercial logic is the reason for the rule, and quoting it earns more than reciting a case name.",
        },
        {
          kind: "table",
          caption: "The classifications to know cold",
          head: ["Situation", "Offer or invitation?", "Authority and reasoning"],
          rows: [
            ["**Goods displayed on a shop shelf**", "**Invitation to treat**", "*Pharmaceutical Society v Boots* — the customer offers at the till, and the shop accepts there"],
            ["**Goods in a shop window with a price**", "**Invitation to treat**", "*Fisher v Bell* — a display is not an offer to sell, however precise the price"],
            ["**Newspaper advertisement** for goods", "Normally an **invitation to treat**", "*Partridge v Crittenden* — otherwise a seller with limited stock would be bound to every reader"],
            ["**Advertisement promising a reward** on conditions", "**Offer** — a unilateral offer to the world", "*Carlill v Carbolic Smoke Ball Co* — the language showed an intention to be bound on performance"],
            ["**Auction: the auctioneer's request for bids**", "**Invitation to treat**", "*Payne v Cave* — each bid is an offer, accepted by the fall of the hammer, so a bid may be withdrawn before then"],
            ["**Auction advertised \"without reserve\"**", "Invitation to treat as to the sale, but a **collateral offer** to sell to the highest bidder", "The auctioneer is liable for refusing the highest genuine bid"],
            ["**Invitation to tender**", "Normally an **invitation to treat**", "Each tender submitted is an offer; the party inviting them chooses"],
            ["**Tender stating the highest bid will be accepted**", "**Offer**", "The commitment converts it, and submitting the highest bid accepts"],
            ["**Company prospectus** inviting share subscriptions", "**Invitation to treat**", "The application is the offer, allotment the acceptance"],
          ],
        },
        {
          kind: "definition",
          term: "Mere supply of information",
          md: "A statement of the terms on which someone **might** deal, or an answer to a question, is neither an offer nor an invitation to treat — it is simply information. *Harvey v Facey*, where a reply stating the lowest price the owner would accept was held to be information only, not an offer to sell at that price. Look for **language of commitment**: \"I will sell\" differs from \"the lowest price I would take is\".",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Unilateral offers",
          md: "Most contracts are **bilateral** — a promise exchanged for a promise. A **unilateral** offer is a promise in exchange for an **act**: a reward for finding a lost dog, a bonus for hitting a target. Three features follow. It can be made **to the world at large**, so anyone who performs may accept. **Performance is the acceptance**, so no separate communication is needed. And once performance has **begun**, the offeror generally **cannot revoke** — *Errington v Errington* — because it would be unjust to withdraw when the offeree has started to do the very thing asked.",
        },
        {
          kind: "example",
          title: "Finding the offer and the acceptance",
          scenario:
            "Larkfield Tools advertises in a trade magazine: \"Bench grinders, £180 each.\" Ostrey emails asking the best price for ten units. Larkfield replies, \"The lowest we could do on ten is £1,600.\" Ostrey emails back, \"Agreed — send ten at £1,600.\" Larkfield has meanwhile sold its remaining stock and refuses to supply. Separately, Larkfield's website offers \"£50 to any customer who refers a business that places an order over £1,000\"; Bewick refers such a customer, who orders £3,000 of goods, and Larkfield refuses to pay the £50 saying it has withdrawn the scheme.",
          steps: [
            { label: "Classify the magazine advertisement", detail: "An advertisement for goods is normally an INVITATION TO TREAT (Partridge v Crittenden). Larkfield is not bound to supply at £180 to every reader." },
            { label: "Classify Ostrey's enquiry and Larkfield's reply", detail: "Ostrey's email is a REQUEST FOR INFORMATION, not an offer. Larkfield's reply — \"the lowest we could do is £1,600\" — is a MERE SUPPLY OF INFORMATION on Harvey v Facey, because it uses the language of the least it would take rather than a promise to sell." },
            { label: "Classify Ostrey's final email", detail: "Since nothing before it was an offer, Ostrey's \"send ten at £1,600\" is itself the OFFER. Larkfield never accepted it, so there is NO CONTRACT and Larkfield may refuse to supply." },
            { label: "Classify the referral scheme", detail: "A promise of £50 on the performance of a specified act, made to customers generally, is a UNILATERAL OFFER to the world, following Carlill. The language is committal, unlike the price reply." },
            { label: "Decide whether Bewick accepted", detail: "PERFORMANCE IS THE ACCEPTANCE in a unilateral contract, so Bewick accepted by making the referral that produced a qualifying order. No separate communication was needed." },
            { label: "Test the purported withdrawal", detail: "Larkfield cannot revoke once performance has BEGUN (Errington v Errington), and here performance is complete. It is bound to pay the £50." },
          ],
          result:
            "**No contract** with Ostrey — the chain contained no offer until Ostrey's last email, which was never accepted. But Larkfield **is** bound to pay Bewick £50, because a unilateral offer is accepted by performance and cannot be withdrawn once performance has started.",
        },
      ],
      check: {
        q: "A seller replies to an enquiry, \"The lowest price I would accept is £9,000.\" The buyer answers, \"I accept — £9,000.\" Is there a contract?",
        options: [
          "Yes, the seller made an offer which the buyer accepted",
          "No — the reply was a mere supply of information, so the buyer's message is the offer and it has not been accepted",
          "Yes, because a stated price is always an offer",
          "No, because price alone cannot form a contract",
        ],
        correct: 1,
        explain:
          "NO CONTRACT. On HARVEY v FACEY a statement of the lowest price one would accept is a MERE SUPPLY OF INFORMATION, not an offer — it lacks the language of commitment. So the buyer's \"I accept\" is itself the OFFER, and until the seller accepts it there is no contract.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating a priced shop display as an offer the customer can accept.",
      fix: "It is an INVITATION TO TREAT. The customer offers at the till and the shop accepts.",
    },
    {
      trap: "Assuming every advertisement is an invitation to treat.",
      fix: "An advertisement promising a reward on specified conditions is a UNILATERAL OFFER (Carlill).",
    },
    {
      trap: "Reading a quoted price as an offer to sell.",
      fix: "A statement of the lowest acceptable price is MERE INFORMATION (Harvey v Facey). Look for language of commitment.",
    },
    {
      trap: "Letting an offeror revoke a unilateral offer after performance has started.",
      fix: "Once performance has begun the offer generally cannot be revoked (Errington v Errington).",
    },
    {
      trap: "Saying a bidder cannot withdraw a bid at auction.",
      fix: "Each bid is an OFFER, accepted only by the fall of the hammer, so it may be withdrawn before then (Payne v Cave).",
    },
  ],
  keyTerms: [
    { term: "Offer", def: "A definite promise to be bound on specified terms, intended to bind as soon as it is accepted." },
    { term: "Invitation to treat", def: "An indication of willingness to receive offers; it cannot be accepted." },
    { term: "Offeror and offeree", def: "The party making the offer, and the party to whom it is made." },
    { term: "Unilateral offer", def: "A promise given in exchange for an act, which may be made to the world and is accepted by performance." },
    { term: "Mere supply of information", def: "A statement of terms on which one might deal, lacking the language of commitment; not an offer." },
    { term: "Invitation to tender", def: "Normally an invitation to treat, each tender submitted being an offer." },
  ],
  summary: [
    "An offer is a definite promise to be bound; an invitation to treat merely invites offers and cannot be accepted.",
    "Shop displays, advertisements for goods, auction requests for bids, tenders and prospectuses are invitations to treat.",
    "An advertisement promising a reward on conditions is a unilateral offer to the world.",
    "A statement of the lowest acceptable price is mere information, not an offer.",
    "A unilateral offer is accepted by performance and cannot generally be revoked once performance has begun.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is a shop display an invitation to treat rather than an offer?", a: "So the shop remains the offeree and can decline — otherwise it would be bound by a mispriced ticket and bound to sell its last item to every acceptor." },
    { q: "How is a unilateral offer accepted?", a: "By performing the specified act. No separate communication of acceptance is needed." },
    { q: "When can a bid at auction be withdrawn?", a: "At any time before the fall of the hammer, because each bid is an offer and the hammer is the acceptance." },
    { q: "What converts an invitation to tender into an offer?", a: "A commitment such as a statement that the highest bid will be accepted; submitting the highest bid then accepts." },
  ],
}

/* ── Chapter 9 · B1(c) ─────────────────────────────────────────── */

export const LWE_TREE_09: StudyChapter = {
  id: "LWE-09",
  number: 9,
  paper: "LW",
  area: "B",
  title: "Termination of an offer",
  minutes: 15,
  syllabusRefs: ["B1(c)"],
  intro:
    "An offer that has ended cannot be accepted, so the timing question — did the offer still exist when the offeree purported to accept? — decides a great many problems. Revocation is the route with the most traps in it.",
  outcomes: [
    "List the ways an offer comes to an end",
    "Explain that revocation is only effective when communicated, and who may communicate it",
    "Explain why a counter-offer destroys the original offer, and distinguish a request for information",
    "Explain the effect of lapse of time, death and failure of a condition",
    "Decide whether an offer was still open when acceptance was attempted",
  ],
  sections: [
    {
      id: "the-routes",
      heading: "The five ways an offer ends",
      blocks: [
        {
          kind: "table",
          caption: "How an offer terminates",
          head: ["Route", "The rule", "The trap in it"],
          rows: [
            ["**Revocation**", "The offeror withdraws the offer at any time **before acceptance**", "It takes effect only when **actually communicated** to the offeree — the postal rule does **not** apply to revocation"],
            ["**Rejection**", "The offeree refuses the offer, which ends it", "A rejection cannot be retracted; the offeree cannot later accept"],
            ["**Counter-offer**", "A response varying the terms **destroys** the original offer, replacing it with a new one", "*Hyde v Wrench*. Distinguish a mere **request for information**, which leaves the offer alive (*Stevenson v McLean*)"],
            ["**Lapse of time**", "The offer ends on any **stated deadline**, or otherwise after a **reasonable time**", "What is reasonable depends on the subject matter — days for perishables, longer for land"],
            ["**Death**", "Death of the **offeree** ends the offer. Death of the **offeror** ends it once the offeree **knows**", "An offeree ignorant of the offeror's death may still accept, unless the contract required personal performance"],
            ["**Failure of a condition**", "A conditional offer ends if the condition is not met", "The condition may be implied, such as the goods remaining in substantially the same state"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Revocation must reach the offeree — this is the examinable point",
          md: "*Byrne v Van Tienhoven*: a letter of revocation is effective only when it **arrives**, not when it is posted. Combine that with the postal rule for acceptance (chapter 10), which makes acceptance effective on **posting**, and the sequence that regularly appears in scenarios follows: the offeror posts a revocation, the offeree then posts an acceptance, and the revocation arrives afterwards. **The acceptance wins** — it was effective on posting, while the revocation was still in transit and had no effect. Always lay the events out in order with two different rules in mind.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Revocation can be communicated by a reliable third party",
          md: "*Dickinson v Dodds*: the offeree learned from a reliable third party that the property had been sold to someone else, and that was enough — the offer was revoked. So the offeror need not do the communicating personally. But the source must be **reliable**; a vague rumour will not do.",
        },
        {
          kind: "definition",
          term: "Counter-offer",
          md: "A reply that **varies the terms** of the offer. It is not an acceptance — it **destroys** the original offer, so the offeree cannot afterwards change their mind and accept the original terms. *Hyde v Wrench*, where an offer to sell at £1,000 met a response of £950; the original offer was gone, and a later purported acceptance of £1,000 was ineffective.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Counter-offer against request for information",
          md: "A **counter-offer** varies a term and kills the offer. A **request for information** merely asks a question and leaves it standing — *Stevenson v McLean*, where asking whether delivery could be spread over two months did not destroy the offer. The distinction is whether the reply **proposes different terms** or **seeks clarification**. \"Would you take £950?\" is a question; \"I'll pay £950\" is a counter-offer. Scenarios are built on exactly this line.",
        },
        {
          kind: "example",
          title: "Laying the sequence out in order",
          scenario:
            "On 1 June Vellacott posts a letter to Ridgeway offering to sell a printing press for £24,000, and says the offer stands until 15 June. On 4 June Ridgeway posts a letter asking whether Vellacott would deliver in two instalments. On 6 June Vellacott posts a letter revoking the offer. On 7 June Ridgeway, having heard nothing, posts a letter accepting at £24,000. Vellacott's revocation arrives on 8 June; Ridgeway's acceptance arrives on 9 June. On 10 June Ridgeway learns from a mutual supplier, who had it directly from Vellacott, that the press was sold to a third party on 5 June.",
          steps: [
            { label: "Classify the 4 June letter", detail: "Asking whether delivery could be split is a REQUEST FOR INFORMATION on Stevenson v McLean — it proposes no different term. So it does NOT destroy the offer, which remains open." },
            { label: "Fix when the revocation took effect", detail: "On Byrne v Van Tienhoven a posted revocation is effective only ON ARRIVAL — 8 June. Posting it on 6 June did nothing." },
            { label: "Fix when the acceptance took effect", detail: "Under the POSTAL RULE acceptance is effective ON POSTING — 7 June — provided post was a reasonable means, which it was, the parties having used it throughout." },
            { label: "Compare the two dates", detail: "Acceptance took effect 7 June; revocation took effect 8 June. The offer was therefore still open when accepted, and a CONTRACT was formed on 7 June. The revocation came too late." },
            { label: "Test the third-party information", detail: "Dickinson v Dodds allows revocation to be communicated by a RELIABLE third party — but Ridgeway learned of the sale on 10 JUNE, three days after the contract was already formed. It cannot revoke an offer that has already been accepted." },
            { label: "State the consequence", detail: "There is a binding contract from 7 June. Having sold the press elsewhere on 5 June, Vellacott is in breach and liable in damages." },
          ],
          result:
            "A contract was formed on **7 June**. The two different timing rules — acceptance on **posting**, revocation on **arrival** — are what decide it, and the reliable third-party information arrived too late to matter.",
        },
      ],
      check: {
        q: "An offeror posts a revocation on Monday. The offeree posts an acceptance on Tuesday. The revocation arrives on Wednesday. What is the position?",
        options: [
          "No contract — the revocation was posted first",
          "A contract was formed on Tuesday: acceptance is effective on posting, but revocation only on arrival",
          "No contract, because the two cancelled each other out",
          "A contract was formed on Wednesday when the revocation arrived",
        ],
        correct: 1,
        explain:
          "A CONTRACT on TUESDAY. Two different rules apply. Acceptance is effective ON POSTING under the postal rule; revocation is effective only when it ACTUALLY ARRIVES (Byrne v Van Tienhoven). So the acceptance took effect on Tuesday while the revocation was still in the post and had no effect.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Applying the postal rule to a revocation.",
      fix: "Revocation is effective only on ARRIVAL. The postal rule applies to acceptance alone.",
    },
    {
      trap: "Treating any query about terms as a counter-offer.",
      fix: "A REQUEST FOR INFORMATION leaves the offer alive (Stevenson v McLean). Only a reply proposing different terms destroys it.",
    },
    {
      trap: "Letting an offeree accept after making a counter-offer.",
      fix: "The counter-offer destroyed the original offer (Hyde v Wrench). There is nothing left to accept.",
    },
    {
      trap: "Requiring the offeror personally to communicate a revocation.",
      fix: "A reliable third party will do (Dickinson v Dodds) — but the source must be reliable.",
    },
  ],
  keyTerms: [
    { term: "Revocation", def: "Withdrawal of an offer before acceptance, effective only when actually communicated to the offeree." },
    { term: "Counter-offer", def: "A reply varying the terms, which destroys the original offer and substitutes a new one." },
    { term: "Request for information", def: "A query seeking clarification, which leaves the original offer standing." },
    { term: "Lapse of time", def: "The ending of an offer on a stated deadline or, absent one, after a reasonable time." },
    { term: "Failure of condition", def: "The ending of a conditional offer where the condition, express or implied, is not satisfied." },
  ],
  summary: [
    "An offer ends by revocation, rejection, counter-offer, lapse of time, death, or failure of a condition.",
    "Revocation binds only when communicated, and a reliable third party may communicate it.",
    "Acceptance is effective on posting while revocation is effective on arrival, so the order of events must be mapped carefully.",
    "A counter-offer destroys the offer; a request for information does not.",
    "Death of the offeror ends the offer once the offeree knows of it.",
  ],
  knowledgeDiagnostic: [
    { q: "When does a posted revocation take effect?", a: "When it actually arrives, not when posted (Byrne v Van Tienhoven)." },
    { q: "Distinguish a counter-offer from a request for information.", a: "A counter-offer proposes different terms and destroys the offer; a request for information seeks clarification and leaves it alive." },
    { q: "Can someone other than the offeror revoke an offer?", a: "Yes — communication by a reliable third party suffices (Dickinson v Dodds)." },
    { q: "What happens to an offer when the offeror dies?", a: "It ends once the offeree learns of the death, unless the contract required personal performance." },
  ],
}

export const LWE_TREE_AREA_B_PART1: StudyChapter[] = [
  LWE_TREE_07,
  LWE_TREE_08,
  LWE_TREE_09,
]
