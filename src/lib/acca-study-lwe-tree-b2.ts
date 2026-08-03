import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area B, second part — acceptance, consideration, privity and intention.
 * Chapters 10–12 of the LW-ENG reading tree, completing syllabus group B1.
 *
 * Consideration is the doctrine with no CISG counterpart at all, and it is where the
 * ENG paper diverges most sharply from Global: an international sale under the
 * Convention needs no consideration, while an English contract without it binds
 * nobody unless made by deed. The part-payment-of-debt line and promissory estoppel
 * are the two places candidates most often go wrong, so both get their own treatment.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Case names are used as citations
 * for a proposition, never as a source of prose.
 */

/* ── Chapter 10 · B1(d) ────────────────────────────────────────── */

export const LWE_TREE_10: StudyChapter = {
  id: "LWE-10",
  number: 10,
  paper: "LW",
  area: "B",
  title: "Acceptance, and the postal rule",
  minutes: 16,
  syllabusRefs: ["B1(d)"],
  intro:
    "Acceptance must be unqualified and it must be communicated — and the one large exception to communication, the postal rule, exists to protect an offeree who has done everything asked of them.",
  outcomes: [
    "State the requirements of a valid acceptance",
    "Explain why silence cannot amount to acceptance",
    "Apply the postal rule and identify when it does not operate",
    "Explain when acceptance by instantaneous means takes effect",
    "Explain the effect of a prescribed mode of acceptance",
  ],
  sections: [
    {
      id: "requirements",
      heading: "What makes an acceptance valid",
      blocks: [
        {
          kind: "definition",
          term: "Acceptance",
          md: "**Unqualified agreement** to all the terms of the offer, **communicated** to the offeror. Unqualified means it must **mirror** the offer: any variation is a counter-offer (chapter 9), and an acceptance \"subject to contract\" is not an acceptance at all.",
        },
        {
          kind: "list",
          title: "The requirements",
          items: [
            "**Unqualified.** It must match the offer's terms exactly. Adding or altering a term makes it a counter-offer.",
            "**Made in response to the offer.** A person unaware of the offer cannot accept it, even if they happen to do the very act requested.",
            "**Communicated to the offeror**, by the offeree or someone authorised — subject to the postal rule and unilateral contracts.",
            "**By an act, not by silence.** Some positive conduct is needed.",
            "**In a valid mode** — any mode as effective as the one prescribed, unless the offeror insisted on one exclusively.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Silence is never acceptance",
          md: "*Felthouse v Bindley*: an offeror cannot write \"if I hear no more from you I shall consider the horse mine\" and turn the offeree's inaction into agreement. The reason is that an offeror **cannot impose a duty to reply** — nobody should have to write a letter to avoid being bound. So in any scenario where the offeror declares that silence will count, the answer is that there is **no contract** unless the offeree did something positive.",
        },
        {
          kind: "table",
          caption: "When acceptance takes effect, by method",
          head: ["Method", "Effective when", "Notes"],
          rows: [
            ["**Post**", "**On posting**, properly addressed and stamped", "*Adams v Lindsell*. It applies even if the letter is delayed or lost, so the risk falls on the offeror"],
            ["**Instantaneous means** — telephone, telex", "**On receipt**", "*Entores v Miles Far East*. The parties are effectively in each other's presence"],
            ["**Email and electronic messages**", "Generally **on receipt** in the offeror's system", "Treated as effectively instantaneous rather than postal"],
            ["**Performance**, in a unilateral contract", "**On performance** of the act", "No separate communication is required (chapter 8)"],
          ],
        },
        {
          kind: "definition",
          term: "The postal rule",
          md: "Where post is a **reasonable means** of acceptance, the acceptance is complete **when the letter is posted**, not when it arrives. It applies even where the letter is **delayed or never arrives at all**, which places the risk of the post on the **offeror**.",
        },
        {
          kind: "list",
          title: "When the postal rule does NOT apply",
          items: [
            "The offer **required actual receipt** — wording such as \"acceptance to reach us by\" displaces the rule.",
            "Post was **not a reasonable means** in the circumstances, for instance during a known postal strike.",
            "The letter was **incorrectly addressed** or not properly posted through the offeree's own fault.",
            "The message is a **revocation** rather than an acceptance (chapter 9).",
            "The communication is by an **instantaneous** method, where receipt governs.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "How an offeror disapplies the postal rule",
          md: "The rule is a default, not a fixture. An offeror who says \"**notice of acceptance must reach me by 5pm on Friday**\" has required **actual communication**, and a letter posted on Thursday that arrives on Monday accepts nothing. That single drafting point is regularly the difference between a contract and no contract, and it is why commercial offers are worded that way.",
        },
        {
          kind: "definition",
          term: "Prescribed mode of acceptance",
          md: "Where the offeror specifies a method, an acceptance by an **equally effective and no slower** method is generally still valid. Only if the offeror made the method **mandatory** — \"by recorded delivery **and no other means**\" — will an alternative fail. So specifying a method is usually a suggestion; excluding all others is a condition.",
        },
        {
          kind: "example",
          title: "Fixing the moment of acceptance",
          scenario:
            "Coldbrook Ltd emails Sarnesfield Ltd on 2 March offering to supply 500 units at £14 each, adding \"this offer is open for fourteen days; please reply by post\". On 6 March, during a national postal strike widely reported in the press, Sarnesfield posts an acceptance. It never arrives. On 9 March Sarnesfield also leaves a voicemail accepting, which Coldbrook's office plays on 10 March. Coldbrook had emailed a revocation on 8 March, which Sarnesfield read on 8 March. Coldbrook says there is no contract.",
          steps: [
            { label: "Test the posted acceptance against the postal rule", detail: "The rule only applies where post is a REASONABLE MEANS. A widely reported national postal strike means it was NOT reasonable, so the rule does not operate and the lost letter accepted nothing." },
            { label: "Note what would have happened otherwise", detail: "Had there been no strike, posting on 6 March would have completed the acceptance THEN, even though the letter never arrived — the risk of the post falling on Coldbrook. The strike is the fact that changes the answer." },
            { label: "Fix when the revocation took effect", detail: "The revocation was emailed and READ on 8 March. Revocation is effective on ACTUAL COMMUNICATION, so the offer ended on 8 March — before any effective acceptance." },
            { label: "Test the voicemail", detail: "Voicemail is effectively instantaneous, so acceptance would take effect on RECEIPT — at the earliest 9 March, and arguably 10 March when played. Either way it is AFTER the revocation took effect on 8 March, so there was no offer left to accept." },
            { label: "Deal with the prescribed mode", detail: "Coldbrook asked for a reply by post but did not exclude other methods, so voicemail would have been a valid MODE. That does not help Sarnesfield, because the problem is timing, not method." },
          ],
          result:
            "**No contract.** The postal rule was disapplied by the strike, so the only effective acceptance was the voicemail, and by then the emailed revocation had already ended the offer. Reverse the strike and the answer reverses with it.",
        },
      ],
      check: {
        q: "An offeree posts an acceptance which is lost in the post. Post was a reasonable means and the offer did not require receipt. Is there a contract?",
        options: [
          "No, because the offeror never learned of the acceptance",
          "Yes — under the postal rule acceptance was complete on posting, and the risk of loss falls on the offeror",
          "Yes, but only once the offeree proves the letter was posted",
          "No, unless the offeree posts a second letter",
        ],
        correct: 1,
        explain:
          "YES. The POSTAL RULE makes acceptance complete ON POSTING, and it applies even where the letter is DELAYED OR LOST — so the risk of the post falls on the OFFEROR. An offeror who does not want that risk must require actual receipt, which displaces the rule.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Letting an offeror turn the offeree's silence into acceptance.",
      fix: "Silence is never acceptance (Felthouse v Bindley) — an offeror cannot impose a duty to reply.",
    },
    {
      trap: "Applying the postal rule where the offer required acceptance to reach the offeror.",
      fix: "Such wording requires ACTUAL communication and displaces the rule.",
    },
    {
      trap: "Applying the postal rule to email.",
      fix: "Email is treated as effectively instantaneous, so acceptance takes effect on RECEIPT.",
    },
    {
      trap: "Failing an acceptance sent by a method other than the one suggested.",
      fix: "An equally effective and no slower method is valid unless the offeror made the mode mandatory.",
    },
  ],
  keyTerms: [
    { term: "Acceptance", def: "Unqualified agreement to the terms of the offer, communicated to the offeror." },
    { term: "Postal rule", def: "Where post is reasonable, acceptance is complete on posting, even if the letter is delayed or lost." },
    { term: "Prescribed mode", def: "A method of acceptance specified by the offeror; an equally effective method is valid unless the mode was made mandatory." },
    { term: "Subject to contract", def: "Wording showing no intention to be bound yet, so no acceptance has occurred." },
  ],
  summary: [
    "Acceptance must be unqualified, made in response to the offer, and communicated by a positive act.",
    "Silence can never constitute acceptance.",
    "Under the postal rule acceptance is complete on posting, placing the risk of the post on the offeror.",
    "The rule is displaced where receipt is required, where post is unreasonable, or where the method is instantaneous.",
    "A prescribed mode is usually a suggestion; only exclusive wording makes it a condition.",
  ],
  knowledgeDiagnostic: [
    { q: "State the postal rule and who bears the risk under it.", a: "Acceptance is complete on posting where post is a reasonable means, so the offeror bears the risk of delay or loss." },
    { q: "Give three situations where the postal rule does not apply.", a: "Where the offer requires actual receipt, where post is not a reasonable means such as during a strike, and where the communication is a revocation or by instantaneous means." },
    { q: "Why can silence not amount to acceptance?", a: "Because an offeror cannot impose a duty to reply on the offeree (Felthouse v Bindley)." },
    { q: "When does an emailed acceptance take effect?", a: "On receipt in the offeror's system, email being treated as effectively instantaneous rather than postal." },
  ],
}

/* ── Chapter 11 · B1(e), B1(f) ─────────────────────────────────── */

export const LWE_TREE_11: StudyChapter = {
  id: "LWE-11",
  number: 11,
  paper: "LW",
  area: "B",
  title: "Consideration: sufficiency, past consideration and existing duties",
  minutes: 18,
  syllabusRefs: ["B1(e)", "B1(f)"],
  intro:
    "English law will not enforce a bare promise — each side must give something. The rule is easy; the three refinements around it, on past consideration, existing duties and part payment of debts, are where nearly all the marks sit.",
  outcomes: [
    "Define consideration and explain the requirement of a bargain",
    "Distinguish sufficiency from adequacy",
    "Explain why past consideration is not good consideration, and the exception",
    "Apply the rules on performance of an existing duty, including practical benefit",
    "Apply the part-payment-of-debt rule and promissory estoppel",
  ],
  sections: [
    {
      id: "sufficiency",
      heading: "Consideration, and sufficiency against adequacy",
      blocks: [
        {
          kind: "definition",
          term: "Consideration",
          md: "Something of **value in the eye of the law** given by each party — a benefit conferred or a detriment suffered — which is the **price** of the other's promise. It is what distinguishes a **bargain**, which the law enforces, from a **gift promise**, which it does not (unless made by deed).",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Sufficient, not adequate — the distinction that earns the mark",
          md: "Consideration must be **sufficient** (of some recognised legal value) but need **not** be **adequate** (economically equivalent). The courts will not police whether a bargain was a good one — parties are left to make their own. So selling a car worth £8,000 for £1 is a binding contract: the £1 is sufficient, and its inadequacy is nobody's business but the seller's. *Thomas v Thomas*, where a nominal ground rent was sufficient; and *Chappell v Nestlé*, where used chocolate wrappers, of no real value to the sender, were sufficient consideration because the company wanted them.",
        },
        {
          kind: "list",
          title: "What else consideration must satisfy",
          items: [
            "**It must move from the promisee.** The person seeking to enforce the promise must themselves have provided the consideration — which is closely tied to privity (chapter 12).",
            "**It need not move to the promisor.** Consideration may be given to a third party at the promisor's request.",
            "**It must not be past** — see below.",
            "**It must be legally possible.** A promise to do something the law forbids, or an impossibility, is not consideration.",
            "**Forbearance can be consideration.** A promise not to sue on a genuine claim is good consideration.",
          ],
        },
      ],
      check: {
        q: "A seller agrees to sell machinery worth £30,000 for £5,000. Is the contract binding for want of consideration?",
        options: [
          "No, because £5,000 is not adequate consideration for £30,000 of machinery",
          "Yes — consideration must be sufficient but need not be adequate, and the courts will not reopen the parties' bargain",
          "No, unless the seller received independent advice",
          "Yes, but only up to the value actually given",
        ],
        correct: 1,
        explain:
          "BINDING. Consideration must be SUFFICIENT — of some legal value — but need not be ADEQUATE. Courts do not assess whether a bargain was economically sensible; parties make their own. The undervalue might matter to a different doctrine such as undue influence, but not to consideration.",
      },
    },
    {
      id: "past-and-existing",
      heading: "Past consideration, and existing duties",
      blocks: [
        {
          kind: "definition",
          term: "Past consideration",
          md: "An act **already performed before** the promise was made is **not** consideration for it — there was no bargain, because the act was not given in exchange for the promise. *Re McArdle*, where work already done to a property could not support a later promise to pay for it; and *Roscorla v Thomas*, where a promise about a horse's soundness given after the sale was unsupported.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The exception: an act done at the promisor's request",
          md: "*Lampleigh v Braithwait*: where the act was done **at the promisor's request**, in circumstances where **both parties understood it would be paid for**, a later promise to pay is enforceable — the promise merely fixes the amount of what was always going to be remunerated. Three conditions: the act was **requested**, payment was **understood** on both sides, and the promise would have been enforceable had it been made in advance.",
        },
        {
          kind: "table",
          caption: "Performance of an existing duty",
          head: ["Situation", "Good consideration?", "Authority"],
          rows: [
            ["Performing an existing **contractual** duty owed to the same party", "**No** — nothing new is given", "*Stilk v Myrick*: sailors doing their existing job could not claim extra wages"],
            ["Doing **more than** the existing duty requires", "**Yes**", "*Hartley v Ponsonby*: the crew's task became substantially more onerous, so the promise of extra pay bound"],
            ["Performing an existing duty where the promisor gains a **practical benefit**", "**Yes**", "*Williams v Roffey Bros*: completing on time let the main contractor avoid a penalty, and that practical benefit supported the promise of more money"],
            ["Performing an existing **public** duty", "**No**", "Nothing beyond what the law already required"],
            ["Doing **more than** a public duty requires", "**Yes**", "Providing protection beyond what the police were obliged to supply"],
            ["Performing a duty owed to a **third party**", "**Yes**", "The promisor gains something they had no right to demand"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "How Williams v Roffey sits with Stilk v Myrick",
          md: "They look contradictory and are examined on that basis. *Stilk* remains the rule: performing what you already owed is not consideration. *Roffey* adds that where the promisor obtains a **practical benefit** — avoiding a late-delivery penalty, avoiding the cost of finding a replacement supplier — that benefit **can** be the consideration. The limits matter: there must be no **economic duress**, and the promise must not simply have been extracted by a threat to break the contract. So a supplier who demands more money for the same work succeeds only if the customer genuinely gains something, and did not simply capitulate to a threat.",
        },
      ],
      check: {
        q: "A subcontractor threatens to stop work unless paid more. The main contractor agrees, because a delay would trigger a penalty under its own head contract. Is the promise of extra payment binding?",
        options: [
          "No — the subcontractor is only doing what it already agreed to do (Stilk v Myrick)",
          "Yes, if the main contractor gained a practical benefit and there was no economic duress (Williams v Roffey)",
          "Yes, because any renegotiation is binding once agreed",
          "No, because a threat to breach can never support a promise",
        ],
        correct: 1,
        explain:
          "YES, on WILLIAMS v ROFFEY, provided the main contractor obtained a PRACTICAL BENEFIT — here avoiding the penalty under the head contract — and there was NO ECONOMIC DURESS. Stilk v Myrick remains the starting point, but practical benefit can supply the consideration. Duress is the limit: a promise simply extracted by a threat is not enforceable.",
      },
    },
    {
      id: "part-payment",
      heading: "Part payment of a debt, and promissory estoppel",
      blocks: [
        {
          kind: "definition",
          term: "The part-payment rule",
          md: "Part payment of a debt is **not** consideration for a promise to forgo the balance. So a creditor who accepts £600 in \"full settlement\" of £1,000 may still sue for the remaining £400 — *Pinnel's Case*, affirmed in *Foakes v Beer*. The reasoning is that the debtor gives nothing new: they were already obliged to pay the whole sum.",
        },
        {
          kind: "list",
          title: "When the creditor IS bound",
          items: [
            "**Accord and satisfaction** — the debtor provides something **different**: payment early, at a different place, or in a different form at the creditor's request.",
            "**A third party pays** part of the debt in full settlement.",
            "**A composition with creditors**, where creditors collectively agree to accept a proportion.",
            "**Deed** — a release under seal needs no consideration.",
            "**Genuine dispute** about the amount owed, where a compromise is a bargain in itself.",
            "**Promissory estoppel** may prevent the creditor from going back on the promise — see below.",
          ],
        },
        {
          kind: "definition",
          term: "Promissory estoppel",
          md: "Where one party makes a **clear promise** that strict legal rights will not be enforced, **intending it to be relied on**, and the other party **relies** on it, the promisor may be **prevented** from going back on the promise where it would be **inequitable** to do so. *Central London Property Trust v High Trees House*, where a landlord who had agreed to accept reduced rent during the war could not recover the shortfall for that period.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Estoppel is a shield, not a sword — and it is usually suspensory",
          md: "Two limits decide these questions. Promissory estoppel is a **defence**: it prevents enforcement of a right, and it does **not** create a cause of action, so a party cannot sue on the promise alone. And it is generally **suspensory** rather than permanent — it holds off the right for the period of the arrangement, and the promisor may resume full rights on reasonable notice. That is exactly what happened in *High Trees*: the landlord lost the wartime shortfall but recovered the full rent once conditions returned to normal. The doctrine also requires the promisee to have acted **equitably**.",
        },
        {
          kind: "example",
          title: "Working a debt compromise",
          scenario:
            "Bexley Ltd owes Trenmere Supplies £40,000, payable on 30 September. In August Trenmere, worried about Bexley's solvency, writes: \"Given your difficulties, pay £26,000 by 15 September and we will treat the account as closed.\" Bexley pays £26,000 on 12 September and, relying on the account being closed, uses the remaining cash to buy stock for a new contract. In November Trenmere sues for the £14,000 balance. Bexley also points out that a director of Bexley personally paid £3,000 of the £26,000.",
          steps: [
            { label: "Apply the basic rule", detail: "Part payment of a debt is NOT consideration for a promise to forgo the balance (Pinnel's Case, Foakes v Beer). On the basic rule Trenmere can sue for the £14,000, because Bexley gave nothing new for the release." },
            { label: "Test for accord and satisfaction", detail: "Bexley paid EARLY — 12 September against a due date of 30 September. Payment before the due date at the creditor's request is something DIFFERENT from what was owed, and can be good consideration. Trenmere itself asked for payment by 15 September, so this is a strong argument." },
            { label: "Test the third-party payment", detail: "Part of the sum came from a DIRECTOR PERSONALLY, not the company. Payment by a third party in full settlement is one of the recognised situations in which the creditor is bound, which strengthens Bexley's position on that portion at least." },
            { label: "Test promissory estoppel", detail: "Trenmere made a CLEAR promise to close the account, INTENDING reliance, and Bexley RELIED by committing the retained cash to stock. It would be INEQUITABLE to allow Trenmere to resile after that reliance." },
            { label: "Note the limits on estoppel", detail: "Estoppel is a SHIELD — Bexley uses it to defend the claim, not to sue. It is also generally SUSPENSORY, but here the promise was to close the account permanently and the reliance is complete, so it operates to defeat the claim rather than merely postpone it." },
          ],
          result:
            "Trenmere is very likely **bound**. The strongest ground is **accord and satisfaction through early payment** at Trenmere's own request, reinforced by the **third-party payment** and by **promissory estoppel** on the reliance. Change one fact — payment on the due date rather than early — and the basic *Foakes v Beer* rule would put Trenmere back in the game.",
        },
      ],
      check: {
        q: "A creditor accepts £600 in full settlement of a £1,000 debt, paid on the original due date with nothing else changing. Can the creditor sue for the balance?",
        options: [
          "No, because the creditor agreed to accept the lesser sum",
          "Yes — part payment is not consideration for releasing the balance (Foakes v Beer), absent accord and satisfaction or estoppel",
          "No, because the agreement is a binding compromise",
          "Yes, but only if the creditor gave notice of the intention to sue",
        ],
        correct: 1,
        explain:
          "YES. Part payment of a debt is NOT consideration for a promise to forgo the balance (Pinnel's Case, Foakes v Beer), because the debtor gives nothing new. The creditor would be bound only if something DIFFERENT was provided — early payment, a different form, a third-party payment, a deed, a composition — or if promissory estoppel applied on the facts.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Failing a contract because the price was far below value.",
      fix: "Consideration must be SUFFICIENT, not ADEQUATE. Courts do not reopen the parties' bargain.",
    },
    {
      trap: "Enforcing a promise to pay for work already completed.",
      fix: "Past consideration is not good consideration, unless the act was done at the promisor's REQUEST with payment understood (Lampleigh v Braithwait).",
    },
    {
      trap: "Treating Williams v Roffey as overruling Stilk v Myrick.",
      fix: "Stilk remains the rule. Roffey adds that a PRACTICAL BENEFIT can supply consideration, absent economic duress.",
    },
    {
      trap: "Assuming a creditor who accepts less is always bound.",
      fix: "Part payment is not consideration. Look for accord and satisfaction, a third-party payment, a composition, a deed, or estoppel.",
    },
    {
      trap: "Using promissory estoppel as the basis of a claim.",
      fix: "It is a SHIELD, not a sword, and is generally suspensory rather than permanent.",
    },
  ],
  keyTerms: [
    { term: "Consideration", def: "Something of value in the eye of the law given by each party as the price of the other's promise." },
    { term: "Sufficiency", def: "The requirement that consideration have some recognised legal value, regardless of economic equivalence." },
    { term: "Adequacy", def: "Economic equivalence, which the law does not require." },
    { term: "Past consideration", def: "An act performed before the promise was made, which is not consideration for it." },
    { term: "Practical benefit", def: "A real advantage gained by the promisor which can support a promise to pay more for an existing duty (Williams v Roffey)." },
    { term: "Accord and satisfaction", def: "Agreement to accept something different in discharge of a debt, which binds the creditor." },
    { term: "Promissory estoppel", def: "An equitable defence preventing a promisor resiling from a promise relied on, where it would be inequitable; generally suspensory." },
  ],
  summary: [
    "Consideration must be sufficient but need not be adequate, and must move from the promisee.",
    "Past consideration is not good consideration unless the act was requested with payment understood.",
    "Performing an existing duty is not consideration, unless more is done or the promisor gains a practical benefit.",
    "Part payment of a debt does not release the balance absent accord and satisfaction, a composition, a deed or estoppel.",
    "Promissory estoppel is a shield only, and generally suspends rather than extinguishes rights.",
  ],
  knowledgeDiagnostic: [
    { q: "Distinguish sufficiency from adequacy.", a: "Sufficiency means having some legal value, which is required; adequacy means economic equivalence, which is not." },
    { q: "When can a promise to pay for a past act be enforced?", a: "Where the act was done at the promisor's request, both parties understood it would be paid for, and the promise would have been enforceable if made in advance." },
    { q: "How does Williams v Roffey coexist with Stilk v Myrick?", a: "Stilk remains the rule that performing an existing duty is not consideration; Roffey allows a practical benefit to the promisor to supply it, provided there is no economic duress." },
    { q: "Name four situations in which a creditor accepting part payment is bound.", a: "Accord and satisfaction such as early payment, payment by a third party, a composition with creditors, and a release by deed." },
    { q: "State two limits on promissory estoppel.", a: "It is a defence and creates no cause of action, and it is generally suspensory so rights may be resumed on reasonable notice." },
  ],
}

/* ── Chapter 12 · B1(g), B1(h) ─────────────────────────────────── */

export const LWE_TREE_12: StudyChapter = {
  id: "LWE-12",
  number: 12,
  paper: "LW",
  area: "B",
  title: "Privity, and intention to create legal relations",
  minutes: 15,
  syllabusRefs: ["B1(g)", "B1(h)"],
  intro:
    "Two doctrines that decide whether anyone can sue at all: privity asks who is entitled to enforce a contract, and intention asks whether the parties meant their arrangement to be legally binding in the first place.",
  outcomes: [
    "Explain the doctrine of privity and its relationship with consideration",
    "Identify the exceptions, including the Contracts (Rights of Third Parties) Act 1999",
    "State the presumption for social and domestic agreements and how it is rebutted",
    "State the presumption for commercial agreements and how it is rebutted",
    "Apply both doctrines to decide whether a claim can be brought",
  ],
  sections: [
    {
      id: "privity",
      heading: "Privity of contract",
      blocks: [
        {
          kind: "definition",
          term: "Privity of contract",
          md: "Only a **party** to a contract can sue or be sued on it. A third party, however much they stand to gain, acquires **no right of enforcement** at common law — *Tweddle v Atkinson*, where a son could not enforce a promise made between his father and his father-in-law for his benefit; and *Dunlop v Selfridge*, where a manufacturer could not enforce a resale price term against a retailer it had not contracted with.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Privity and consideration are two sides of one idea",
          md: "Consideration must **move from the promisee** (chapter 11), and only a party may sue. So the third party fails twice over: they are not a party, and they gave nothing. That is why the two doctrines are examined together, and why an answer should mention both — a third party beneficiary who happened to provide consideration is a different and better case.",
        },
        {
          kind: "definition",
          term: "Contracts (Rights of Third Parties) Act 1999",
          md: "The main statutory inroad. A third party may enforce a term where the contract **expressly provides** that they may, or where the term **purports to confer a benefit** on them — unless, on the proper construction, the parties did **not** intend it to be enforceable by that third party. The third party must be **identified** in the contract by name, as a member of a class, or by description, but **need not exist** when the contract is made.",
        },
        {
          kind: "table",
          caption: "The other routes round privity",
          head: ["Route", "How it works"],
          rows: [
            ["**Agency**", "An agent contracts for a principal, who is the real party and can sue (chapter 28)"],
            ["**Assignment**", "The benefit of a contract is transferred to a third party, who may then enforce it"],
            ["**Trusts**", "A beneficiary may enforce against a trustee"],
            ["**Collateral contract**", "A separate contract with the third party is found alongside the main one"],
            ["**Negotiable instruments**", "A holder in due course takes rights in the instrument"],
            ["**Tort**", "A duty of care may be owed to a third party independently of contract (chapters 20, 22) — which is how an auditor can be liable to someone who never engaged them"],
            ["**Statute**", "Motor insurance and certain property covenants confer rights directly"],
          ],
        },
      ],
      check: {
        q: "A contract between A and B contains a term stating that C, named in the contract, may enforce the warranty. Can C sue?",
        options: [
          "No — privity means only A and B can sue on their contract",
          "Yes, under the Contracts (Rights of Third Parties) Act 1999, since the contract expressly provides that C may enforce it",
          "Only if C provided consideration",
          "Only if A and B both consent at the time of the claim",
        ],
        correct: 1,
        explain:
          "YES, under the CONTRACTS (RIGHTS OF THIRD PARTIES) ACT 1999. The Act lets a third party enforce a term where the contract EXPRESSLY PROVIDES they may, or where the term purports to confer a benefit on them and the parties intended it to be enforceable. C is identified by name, which satisfies the identification requirement, and no consideration from C is needed.",
      },
    },
    {
      id: "intention",
      heading: "Intention to create legal relations",
      blocks: [
        {
          kind: "table",
          caption: "Two presumptions, pulling opposite ways",
          head: ["Type of agreement", "Presumption", "How it is rebutted"],
          rows: [
            ["**Social, domestic and family**", "**No** intention to create legal relations — the agreement is not binding", "By evidence that the parties DID intend to be bound, especially where they were **separating** rather than living amicably, or where money changed hands on a business footing"],
            ["**Commercial**", "**Intention IS present** — the agreement is binding", "By clear words negativing it: an **honour clause**, \"binding in honour only\", \"subject to contract\", or an express statement that the arrangement is not to give rise to legal relations"],
          ],
        },
        {
          kind: "illustration",
          title: "The domestic presumption, and its rebuttal",
          md: "In *Balfour v Balfour* a husband going abroad promised his wife a monthly allowance while they remained on good terms. When the marriage later broke down she sued on the promise and failed: a domestic arrangement between a couple living in harmony is presumed **not** to be legally binding.\n\nIn *Merritt v Merritt* the facts looked similar but the couple had already **separated** when the husband promised to transfer the house if the wife paid off the mortgage. The presumption was **rebutted** — parties negotiating at arm's length in the wreckage of a marriage plainly do intend legal consequences, and she had performed her side.\n\nThe lesson for scenarios: look at the **state of the relationship** when the promise was made, and at whether the promisee did something in reliance."
        },
        {
          kind: "callout",
          tone: "warn",
          title: "An honour clause defeats an otherwise perfect contract",
          md: "In a commercial setting the presumption of intention is strong, but it **can** be displaced by clear wording. *Rose & Frank v Crompton*, where an agreement stating it was not a formal or legal agreement and was binding in honour only was held **unenforceable** — despite being a substantial commercial arrangement. Football pool coupons work the same way: the words on the coupon negative intention, which is why a claim on a lost coupon fails. So when a scenario quotes odd wording from a document, check whether it is an honour clause before analysing anything else.",
        },
        {
          kind: "example",
          title: "Applying both doctrines together",
          scenario:
            "Aldous promises his daughter Ivy £900 a month while she studies, provided she keeps up her grades; they are on good terms and nothing is written down. Ivy gives up a part-time job in reliance. Separately, Aldous's company, Aldous Freight Ltd, signs a supply arrangement with Kentmere Ltd containing the words \"this document records the parties' intentions and is binding in honour only\". The arrangement also states that Aldous Freight's customer, Vasser plc, named in it, may enforce the delivery-time warranty directly. Kentmere delivers late; Vasser suffers loss and wants to sue Kentmere.",
          steps: [
            { label: "Test the family promise for intention", detail: "This is a SOCIAL AND DOMESTIC agreement between family members on GOOD TERMS, so the presumption is that there was NO intention to create legal relations — Balfour v Balfour. Ivy cannot enforce it." },
            { label: "Consider whether the presumption is rebutted", detail: "Ivy gave up a job in reliance, which is a point in her favour, but the parties were on good terms and there was no separation or arm's-length negotiation as in Merritt v Merritt. The presumption most likely STANDS, so the promise is not binding." },
            { label: "Test the commercial arrangement for intention", detail: "Commercially, intention is PRESUMED — but the words \"binding in honour only\" are a classic HONOUR CLAUSE, and on Rose & Frank v Crompton they REBUT the presumption. The whole document is therefore unenforceable as a contract." },
            { label: "Draw the consequence for Vasser", detail: "The 1999 Act lets a third party enforce a TERM OF A CONTRACT. Here there is NO enforceable contract at all, because intention was negatived — so there is no term for Vasser to enforce, and its identification by name gets it nowhere." },
            { label: "Look for an alternative route for Vasser", detail: "Vasser's remaining possibilities lie OUTSIDE contract: a claim in TORT if Kentmere owed it an independent duty of care, or a claim against Aldous Freight under Vasser's own contract with it. The privity workaround cannot repair a document that was never binding." },
          ],
          result:
            "Neither claim succeeds on the contract. The family promise fails on the **domestic presumption**; Vasser fails because the **honour clause** means there is no contract for the **1999 Act** to operate on. The general point is that intention is logically prior — test it before reaching for the third-party rights.",
        },
      ],
      check: {
        q: "A substantial commercial agreement states it is \"binding in honour only\". What is its status?",
        options: [
          "Binding, since the presumption of intention in commercial agreements cannot be displaced",
          "Unenforceable — the honour clause rebuts the presumption of intention to create legal relations",
          "Binding, but only as to terms already performed",
          "Void for uncertainty",
        ],
        correct: 1,
        explain:
          "UNENFORCEABLE. In commercial dealings intention IS presumed, but the presumption is REBUTTABLE by clear words — and an honour clause is exactly that (Rose & Frank v Crompton). It is not void for uncertainty; the parties simply chose not to create legal relations.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Letting a third party beneficiary sue at common law because the contract was for their benefit.",
      fix: "Privity bars it. Look for the 1999 Act, agency, assignment, a trust, a collateral contract, or a claim in tort.",
    },
    {
      trap: "Applying the domestic presumption to a separated couple.",
      fix: "Separation and arm's-length negotiation rebut it (Merritt v Merritt).",
    },
    {
      trap: "Assuming any substantial commercial document must be binding.",
      fix: "An honour clause rebuts the presumption of intention (Rose & Frank v Crompton).",
    },
    {
      trap: "Using the 1999 Act on a document that was never a contract.",
      fix: "The Act lets a third party enforce a TERM of a contract. Test intention first — no contract means no term.",
    },
  ],
  keyTerms: [
    { term: "Privity of contract", def: "Only a party to a contract may sue or be sued on it." },
    { term: "Contracts (Rights of Third Parties) Act 1999", def: "Allows an identified third party to enforce a term expressly made enforceable by them, or one purporting to confer a benefit, unless the parties intended otherwise." },
    { term: "Assignment", def: "Transfer of the benefit of a contract to a third party, who may then enforce it." },
    { term: "Honour clause", def: "Wording stating an agreement is binding in honour only, which rebuts the presumption of intention in a commercial context." },
    { term: "Subject to contract", def: "Wording indicating the parties do not yet intend to be bound." },
  ],
  summary: [
    "Only a party to a contract may enforce it, and consideration must move from the promisee.",
    "The Contracts (Rights of Third Parties) Act 1999 is the main statutory exception, requiring the third party to be identified.",
    "Agency, assignment, trusts, collateral contracts, negotiable instruments, tort and statute are the other routes round privity.",
    "Social and domestic agreements are presumed not binding, rebuttable by separation or arm's-length dealing.",
    "Commercial agreements are presumed binding, rebuttable by an honour clause or similar wording.",
  ],
  knowledgeDiagnostic: [
    { q: "State the doctrine of privity and its link to consideration.", a: "Only a party may sue on a contract, and consideration must move from the promisee — so a third-party beneficiary fails on both counts." },
    { q: "What must a contract do for a third party to enforce a term under the 1999 Act?", a: "Expressly provide that the third party may enforce it, or contain a term purporting to confer a benefit, with the third party identified by name, class or description." },
    { q: "How is the domestic presumption rebutted?", a: "By evidence of an intention to be bound, most obviously where the parties had separated and negotiated at arm's length (Merritt v Merritt)." },
    { q: "What is the effect of an honour clause in a commercial agreement?", a: "It rebuts the presumption of intention, leaving the agreement unenforceable as a contract (Rose & Frank v Crompton)." },
  ],
}

export const LWE_TREE_AREA_B_PART2: StudyChapter[] = [
  LWE_TREE_10,
  LWE_TREE_11,
  LWE_TREE_12,
]
