import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area B, third part — the content of contracts, and breach and remedies.
 * Chapters 13–18 of the LW-ENG reading tree, mapped to syllabus groups B2–B3.
 *
 * The classification of terms is the spine of this part: whether a term is a
 * CONDITION, a WARRANTY or an INNOMINATE term decides what the injured party may do
 * about its breach, and almost every remedies question resolves back to it. So
 * chapter 13 sets the classification up and chapter 16 spends it.
 *
 * Consumer protection is stated on the CRA 2015 / UCTA 1977 split that the ENG
 * syllabus uses: the Consumer Rights Act 2015 governs business-to-consumer terms, and
 * the Unfair Contract Terms Act 1977 the remaining business-to-business ones.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Case names are citations for a
 * proposition, never a source of prose.
 */

/* ── Chapter 13 · B2(a), B2(b) ─────────────────────────────────── */

export const LWE_TREE_13: StudyChapter = {
  id: "LWE-13",
  number: 13,
  paper: "LW",
  area: "B",
  title: "Terms, representations, and the classification of terms",
  minutes: 17,
  syllabusRefs: ["B2(a)", "B2(b)"],
  intro:
    "Everything said during negotiations is either a term of the contract or a representation about it, and the difference decides which claim lies. Then, among the terms, the classification decides how much the injured party can do — which is the single most useful piece of machinery in Area B.",
  outcomes: [
    "Distinguish a term from a mere representation, and apply the factors",
    "Distinguish express from implied terms and identify the sources of implied terms",
    "Classify a term as a condition, a warranty or an innominate term",
    "State the consequences of breach of each class of term",
    "Apply the classification to decide what remedy is open",
  ],
  sections: [
    {
      id: "terms-v-representations",
      heading: "Term or mere representation?",
      blocks: [
        {
          kind: "table",
          caption: "The two, and why the difference matters",
          head: ["", "Term", "Mere representation"],
          rows: [
            ["**What it is**", "A **promise** forming part of the contract", "A **statement of fact** inducing the contract but not part of it"],
            ["**If it proves untrue**", "**Breach of contract**", "**Misrepresentation**"],
            ["**Remedy**", "Damages as of right, and **termination** if the term is a condition", "**Rescission**, and damages depending on whether the misrepresentation was fraudulent, negligent or innocent"],
          ],
        },
        {
          kind: "list",
          title: "The factors that decide which it is",
          items: [
            "**The importance attached to the statement.** The more central it was to the decision to contract, the more likely it is a term.",
            "**The relative expertise of the parties.** A statement by the party with **special knowledge** is more likely a term; the same words from a private seller to a dealer are more likely a representation.",
            "**The timing.** A statement made **at the moment of contracting** is more likely a term; one made well before, and not repeated, less so.",
            "**Whether it was reduced to writing.** A statement omitted from the written contract points towards representation.",
            "**Whether the maker invited verification.** Telling the other party to have the goods inspected suggests the statement was not a promise.",
          ],
        },
        {
          kind: "definition",
          term: "Implied terms",
          md: "Terms not expressly agreed but read into the contract. They come from **statute** (the Sale of Goods Act 1979 and the Consumer Rights Act 2015 imply terms as to description, quality and fitness), from **the courts** (to give effect to what the parties must have intended, or as necessary incidents of that type of contract), from **custom** of a trade, and from a **previous consistent course of dealing** between the parties.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "An express term normally beats an inconsistent implied one — but not a statutory one",
          md: "Terms implied by the **courts** or by **custom** yield to a contrary express agreement, because they exist only to fill gaps. Terms implied by **statute** may not: the Consumer Rights Act's terms as to quality and fitness **cannot be excluded** against a consumer at all, and UCTA restricts exclusion between businesses (chapter 14). So the order of analysis is: find the express terms, add the implied ones, then test any attempt to exclude the statutory ones.",
        },
      ],
      check: {
        q: "A car dealer tells a private buyer the car has done 20,000 miles. It has done 90,000. Term or representation?",
        options: [
          "A mere representation, because it was made during negotiations",
          "A term — the dealer had the special expertise and the statement was central to the purchase",
          "Neither, since mileage is a matter of opinion",
          "A term only if it was written into the contract",
        ],
        correct: 1,
        explain:
          "A TERM. The statement came from the party with SPECIAL KNOWLEDGE — a dealer speaking to a private buyer — and mileage is central to the decision to buy. Reverse the parties, so that a private seller tells a dealer, and the same words are far more likely to be a MERE REPRESENTATION, because the dealer has the expertise.",
      },
    },
    {
      id: "classification",
      heading: "Conditions, warranties and innominate terms",
      blocks: [
        {
          kind: "table",
          caption: "The three classes, and what breach of each permits",
          head: ["Class", "What it is", "Remedy for breach"],
          rows: [
            ["**Condition**", "A term **going to the root** of the contract — the substance of what was bargained for", "**Damages**, AND the right to **terminate** and treat the contract as at an end (repudiate)"],
            ["**Warranty**", "A **subsidiary** term, incidental to the main purpose", "**Damages only** — the contract continues and must be performed"],
            ["**Innominate (intermediate) term**", "A term capable of being broken in **trivial or serious** ways, so it cannot be classified in advance", "Depends on the **consequences of the actual breach**: serious consequences give the right to terminate, trivial ones only damages"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The innominate term exists to stop the label doing injustice",
          md: "If every term had to be a condition or a warranty from the outset, a party could terminate a large contract for a technical breach merely because the term was labelled a condition. The **innominate** category asks instead what the breach **actually did**: did it deprive the injured party of substantially the whole benefit of the contract? If yes, they may terminate; if not, damages only. This is why a scenario describing a **minor** breach of an apparently important term usually points to damages, not termination.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The parties' own labels are persuasive, not conclusive",
          md: "Calling a term a \"condition\" in the contract is evidence of intention, and a court will usually respect it in a commercial agreement negotiated between equals. But a label cannot make a plainly trivial obligation into a condition permitting termination — the court looks at the **substance**. Equally, statute sometimes settles the class: the Sale of Goods Act's terms as to description and quality are **conditions**, so their breach permits rejection of the goods.",
        },
        {
          kind: "example",
          title: "Classifying, then choosing the remedy",
          scenario:
            "Wrayburn Hotels contracts with Selmount Ltd for the supply and installation of 60 bedroom air-conditioning units before the hotel's opening on 1 May. The contract states that (i) the units must be the Selmount X40 model, (ii) delivery must be by 15 April, described in the contract as \"a condition of this agreement\", and (iii) Selmount will provide a printed maintenance manual for each unit. Selmount delivers X40 units on 17 April, installation completes on 24 April, and it supplies the manuals as a single PDF rather than printed copies. Wrayburn opens on time with no disruption, but wants to terminate and refuse payment.",
          steps: [
            { label: "Classify the model requirement", detail: "The identity of the goods goes to the ROOT of the contract — Wrayburn bargained for X40 units. It is a CONDITION, and it was complied with, so nothing turns on it." },
            { label: "Classify the delivery date", detail: "The contract LABELS it a condition, which is persuasive between commercial parties. But the label is not conclusive: the court looks at substance, and here delivery was two days late, installation finished a week before opening, and there was NO DISRUPTION. The term is better treated as INNOMINATE, or the breach as insufficiently serious to justify termination." },
            { label: "Test the consequences of the delivery breach", detail: "Wrayburn was NOT deprived of substantially the whole benefit — it opened on time with working air conditioning. So the remedy is DAMAGES ONLY for any loss actually caused, which on these facts is minimal." },
            { label: "Classify the manuals", detail: "A printed manual is INCIDENTAL to the main purpose of supplying and installing air conditioning. It is a WARRANTY, so breach gives damages only — the cost of printing the manuals — and never a right to terminate." },
            { label: "Conclude on the remedy sought", detail: "Wrayburn CANNOT terminate or refuse payment. It must pay the price and is left with damages for the late delivery and the manuals, both small. Refusing to pay would put Wrayburn itself in breach." },
          ],
          result:
            "**Damages only.** The point to carry forward is that the contractual **label** on the delivery date did not decide the case — the **consequences of the actual breach** did, which is exactly what the innominate category is for.",
        },
      ],
      check: {
        q: "A term is capable of being breached trivially or seriously, and the actual breach caused only minor inconvenience. What can the injured party do?",
        options: [
          "Terminate, if the contract described the term as a condition",
          "Claim damages only — for an innominate term the remedy follows the consequences of the actual breach",
          "Terminate, because any breach entitles the injured party to end the contract",
          "Nothing, since the breach was minor",
        ],
        correct: 1,
        explain:
          "DAMAGES ONLY. For an INNOMINATE term the remedy depends on the CONSEQUENCES of the actual breach: termination requires that the injured party be deprived of substantially the whole benefit of the contract. Minor inconvenience does not reach that threshold, and a contractual label cannot manufacture a right to terminate.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Deciding term or representation without looking at relative expertise.",
      fix: "A statement by the party with SPECIAL KNOWLEDGE is far more likely to be a term. Reversing the parties can reverse the answer.",
    },
    {
      trap: "Treating a contractual label of \"condition\" as conclusive.",
      fix: "It is persuasive but the court looks at SUBSTANCE, and cannot let a label make a trivial obligation terminable.",
    },
    {
      trap: "Allowing termination for breach of warranty.",
      fix: "Breach of warranty gives DAMAGES ONLY. The contract continues.",
    },
    {
      trap: "Excluding a statutory implied term by an express clause.",
      fix: "Court-implied and custom-implied terms yield to express agreement; statutory ones are restricted by CRA 2015 and UCTA 1977.",
    },
  ],
  keyTerms: [
    { term: "Term", def: "A promise forming part of the contract, whose breach is a breach of contract." },
    { term: "Mere representation", def: "A statement of fact inducing the contract but not part of it; if untrue it gives rise to misrepresentation." },
    { term: "Condition", def: "A term going to the root of the contract; breach gives damages and the right to terminate." },
    { term: "Warranty", def: "A subsidiary term; breach gives damages only." },
    { term: "Innominate term", def: "A term classifiable only after breach, the remedy depending on the seriousness of the consequences." },
    { term: "Implied term", def: "A term read into a contract by statute, the courts, custom or a previous course of dealing." },
  ],
  summary: [
    "A term is a promise; a representation is an inducing statement, and each has its own claim and remedies.",
    "Importance, relative expertise, timing, writing and invitations to verify decide which it is.",
    "Terms are implied by statute, the courts, custom and a course of dealing.",
    "Breach of condition gives damages and termination; breach of warranty gives damages only.",
    "An innominate term is judged by the consequences of the actual breach, and a contractual label is not conclusive.",
  ],
  knowledgeDiagnostic: [
    { q: "Which factor most often decides whether a statement is a term?", a: "The relative expertise of the parties — a statement by the party with special knowledge is much more likely to be a term." },
    { q: "State the remedies for breach of a condition and of a warranty.", a: "Breach of condition gives damages and the right to terminate; breach of warranty gives damages only." },
    { q: "How is an innominate term dealt with?", a: "By asking whether the actual breach deprived the injured party of substantially the whole benefit of the contract; if so they may terminate, otherwise damages only." },
    { q: "Name the four sources of implied terms.", a: "Statute, the courts, trade custom, and a previous consistent course of dealing between the parties." },
  ],
}

/* ── Chapter 14 · B2(c) ────────────────────────────────────────── */

export const LWE_TREE_14: StudyChapter = {
  id: "LWE-14",
  number: 14,
  paper: "LW",
  area: "B",
  title: "Exclusion clauses and unfair terms",
  minutes: 17,
  syllabusRefs: ["B2(c)"],
  intro:
    "An exclusion clause has to clear three hurdles in order — incorporation, construction, and statutory control — and a clause that fails the first never reaches the third. Working them in that sequence is what turns a messy scenario into a clean answer.",
  outcomes: [
    "Apply the incorporation requirements, including notice and a course of dealing",
    "Apply the contra proferentem rule of construction",
    "Apply the Consumer Rights Act 2015 to a business-to-consumer term",
    "Apply the Unfair Contract Terms Act 1977 to a business-to-business term",
    "Decide whether a given exclusion clause is effective",
  ],
  sections: [
    {
      id: "three-hurdles",
      heading: "The three hurdles, in order",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "How to test an exclusion clause",
            caption: "Work them in this order — failure at any stage ends the enquiry.",
            data: {
              steps: [
                { label: "1 · Incorporation", sub: "Is the clause part of the contract at all?" },
                { label: "2 · Construction", sub: "Read as it stands, does it cover this loss?" },
                { label: "3 · Statutory control", sub: "CRA 2015 for consumers, UCTA 1977 between businesses" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "Hurdle 1 — incorporation",
          items: [
            "**By signature.** A signed document binds the signer to its terms, whether or not they read them, absent misrepresentation of the clause's effect.",
            "**By reasonable notice, given BEFORE or AT the time of contracting.** A clause first presented **after** the contract is made is not incorporated — the notice in a hotel bedroom comes too late, because the contract was concluded at reception.",
            "**The more onerous the clause, the greater the notice required.** An unusually wide or severe clause needs to be brought specifically to the other party's attention.",
            "**By a previous consistent course of dealing.** Regular prior contracts on the same terms can incorporate them, but the dealings must be consistent and reasonably numerous.",
            "**Not by a document that is merely a receipt.** A ticket or document a reasonable person would regard as a receipt rather than a contractual document may not carry terms.",
          ],
        },
        {
          kind: "definition",
          term: "Contra proferentem",
          md: "Hurdle 2. An exclusion clause is construed **strictly against the party relying on it**. Any **ambiguity** is resolved against that party, and a clause will not be read as covering a liability it does not clearly describe — so a clause excluding liability for \"breach of warranty\" does not exclude liability for breach of **condition**, and a clause excluding \"negligence\" must say so in terms.",
        },
        {
          kind: "table",
          caption: "Hurdle 3 — which statute applies",
          head: ["Relationship", "Governing regime"],
          rows: [
            ["**Business to consumer**", "**Consumer Rights Act 2015** — unfair terms are not binding on the consumer, and certain terms cannot be excluded at all"],
            ["**Business to business**", "**Unfair Contract Terms Act 1977** — some exclusions are void outright, others are effective only so far as **reasonable**"],
          ],
        },
        {
          kind: "table",
          caption: "The Consumer Rights Act 2015, in outline",
          head: ["Provision", "Effect"],
          rows: [
            ["**Terms as to satisfactory quality, fitness for purpose and description**", "**Cannot be excluded or restricted** against a consumer at all"],
            ["**Liability for death or personal injury from negligence**", "**Cannot be excluded or restricted**"],
            ["**The fairness test** — s.62", "A term is unfair if, contrary to good faith, it causes a **significant imbalance** in the parties' rights to the consumer's detriment. An unfair term is **not binding** on the consumer"],
            ["**Transparency**", "Written terms must be **plain and intelligible**; ambiguity is resolved in the consumer's favour"],
            ["**Core terms**", "The main subject matter and the price are exempt from the fairness test **provided** they are transparent and prominent"],
          ],
        },
        {
          kind: "table",
          caption: "The Unfair Contract Terms Act 1977, between businesses",
          head: ["Liability", "Position"],
          rows: [
            ["**Death or personal injury** caused by negligence", "Exclusion is **VOID** — never permitted"],
            ["**Other loss or damage** caused by negligence", "Exclusion effective only so far as **REASONABLE**"],
            ["**Breach of the implied terms as to quality, fitness and description**", "Exclusion effective only so far as **REASONABLE**"],
            ["**Breach of contract generally**, under a standard-form contract", "Exclusion effective only so far as **REASONABLE**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The reasonableness test, and who has to prove it",
          md: "Reasonableness is judged at the **time the contract was made**, not with hindsight after the loss. The court weighs the parties' **relative bargaining strength**, whether the customer received an **inducement** to accept the clause (a lower price, for instance), whether the customer **knew or ought to have known** of it, and the **availability of insurance**. Crucially, the **burden of proving reasonableness lies on the party relying on the clause** — so in a scenario where the facts are evenly balanced, the clause fails.",
        },
        {
          kind: "example",
          title: "Working all three hurdles",
          scenario:
            "Halvern Ltd, a printing business, buys a guillotine from Castermain Machines. Halvern signs Castermain's standard order form; clause 12 on the reverse states: \"The Company accepts no liability for any loss or damage howsoever arising.\" Nothing was said about clause 12, and Halvern was not shown the reverse. The guillotine is defective: it injures Halvern's operator, ruins £30,000 of paper stock, and causes £70,000 of lost profit. Castermain relies on clause 12. Separately, Castermain sells an identical machine to Odile, a hobbyist buying for home use, on the same form.",
          steps: [
            { label: "Hurdle 1 — incorporation against Halvern", detail: "Halvern SIGNED the order form, and a signature binds the signer whether or not they read the terms. Clause 12 is therefore INCORPORATED, despite Halvern not being shown the reverse. Signature is the strongest route to incorporation." },
            { label: "Hurdle 2 — construction", detail: "\"Any loss or damage howsoever arising\" is very wide but also very vague. Under CONTRA PROFERENTEM it is construed strictly against Castermain, and a clause that never mentions NEGLIGENCE will not readily be read as excluding negligence liability." },
            { label: "Hurdle 3 — the personal injury", detail: "Halvern is a BUSINESS, so UCTA 1977 applies. Exclusion of liability for DEATH OR PERSONAL INJURY caused by negligence is VOID. Clause 12 cannot touch the operator's injury, full stop." },
            { label: "Hurdle 3 — the property damage and lost profit", detail: "These are OTHER LOSS, so exclusion is effective only so far as REASONABLE. Castermain bears the BURDEN of proving reasonableness. Against it: a blanket exclusion of all liability on a standard form, no inducement, no notice drawn to the clause, and Castermain better placed to insure. The clause is very likely UNREASONABLE and so ineffective for the £30,000 and the £70,000." },
            { label: "Now switch to Odile", detail: "Odile buys for HOME USE, so she is a CONSUMER and the CRA 2015 applies instead. The terms as to satisfactory quality and fitness CANNOT BE EXCLUDED against her at all, and clause 12 is in any event an unfair term causing a significant imbalance, so it is NOT BINDING on her. Her position is stronger than Halvern's without needing any reasonableness argument." },
          ],
          result:
            "Clause 12 is **incorporated but ineffective**. Against Halvern it is void for the personal injury and unreasonable for the rest; against Odile the CRA denies it effect outright. The lesson is that **incorporation is the easiest hurdle for the supplier and statutory control the hardest** — so never stop at incorporation.",
        },
      ],
      check: {
        q: "A business supplier's standard-form clause excludes all liability, including for death or personal injury caused by negligence, in a contract with another business. What is the position on the personal injury?",
        options: [
          "Effective if the clause was reasonable in the circumstances",
          "Void — UCTA 1977 never permits exclusion of liability for death or personal injury caused by negligence",
          "Effective, because both parties are businesses of equal standing",
          "Effective only if the buyer was given an inducement to accept it",
        ],
        correct: 1,
        explain:
          "VOID. Under UCTA 1977 an exclusion of liability for DEATH OR PERSONAL INJURY caused by negligence is void outright and no reasonableness argument can save it. The reasonableness test applies only to OTHER loss — property damage, lost profit and the implied terms as to quality and fitness.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Stopping at incorporation and concluding the clause is effective.",
      fix: "Work all THREE hurdles. Incorporation is the easiest for the supplier; statutory control is where clauses usually die.",
    },
    {
      trap: "Treating notice given after contracting as sufficient.",
      fix: "Notice must come BEFORE or AT the time of contracting. A bedroom notice is too late if the contract was made at reception.",
    },
    {
      trap: "Applying UCTA 1977 to a consumer.",
      fix: "Consumers are governed by the CONSUMER RIGHTS ACT 2015; UCTA 1977 covers business-to-business terms.",
    },
    {
      trap: "Putting the burden of proving unreasonableness on the customer.",
      fix: "The party RELYING on the clause must prove it reasonable, judged as at the time of contracting.",
    },
    {
      trap: "Reading a general exclusion as covering negligence.",
      fix: "Contra proferentem construes strictly against the proferens, and negligence must be clearly covered.",
    },
  ],
  keyTerms: [
    { term: "Exclusion clause", def: "A term seeking to exclude or limit liability that would otherwise arise." },
    { term: "Incorporation", def: "The requirement that a clause be part of the contract, by signature, reasonable prior notice, or a course of dealing." },
    { term: "Contra proferentem", def: "The rule construing an exclusion clause strictly against the party relying on it." },
    { term: "Consumer Rights Act 2015", def: "Governs business-to-consumer terms; unfair terms are not binding and quality, fitness and injury liability cannot be excluded." },
    { term: "Unfair Contract Terms Act 1977", def: "Governs business-to-business exclusions; injury exclusions are void, others must be reasonable." },
    { term: "Reasonableness test", def: "Judged at the time of contracting, weighing bargaining strength, inducement, knowledge and insurance; the proferens bears the burden." },
  ],
  summary: [
    "Test an exclusion clause in order: incorporation, construction, then statutory control.",
    "Incorporation comes by signature, by reasonable notice before or at contracting, or by a consistent course of dealing.",
    "Contra proferentem construes the clause strictly against the party relying on it.",
    "Against consumers the CRA 2015 makes unfair terms non-binding and bars excluding quality, fitness and injury liability.",
    "Between businesses UCTA 1977 voids injury exclusions and subjects the rest to reasonableness, which the proferens must prove.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three hurdles for an exclusion clause.", a: "Incorporation into the contract, construction covering the loss, and compliance with the CRA 2015 or UCTA 1977." },
    { q: "When must notice of a clause be given?", a: "Before or at the time of contracting; notice afterwards does not incorporate the clause." },
    { q: "Which exclusions are void outright under UCTA 1977?", a: "Exclusions of liability for death or personal injury caused by negligence." },
    { q: "Who must prove that an exclusion clause is reasonable?", a: "The party relying on it, judged as at the time the contract was made." },
    { q: "What cannot be excluded against a consumer under the CRA 2015?", a: "The terms as to satisfactory quality, fitness for purpose and description, and liability for death or personal injury from negligence." },
  ],
}

export const LWE_TREE_AREA_B_PART3: StudyChapter[] = [LWE_TREE_13, LWE_TREE_14]
