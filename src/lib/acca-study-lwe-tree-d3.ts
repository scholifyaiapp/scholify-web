import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area D, final part — promoters, pre-incorporation contracts, and the
 * formation and constitution of a company.
 * Chapters 32–33 of the LW-ENG reading tree, mapped to syllabus group D4.
 *
 * Forked from the Global tree and specialised to the Companies Act 2006 — which
 * matters more here than anywhere else in Areas D–H, because D4 is almost entirely
 * about English registration mechanics: what goes in the application, what the
 * certificate proves, which records must be kept, how the articles bind, and the
 * controls on names. The Global tree can only gesture at these; ENG is examined on
 * them by section.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named.
 */

/* ── Chapter 32 · D4(a), D4(b) ─────────────────────────────────── */

export const LWE_TREE_32: StudyChapter = {
  id: "LWE-32",
  number: 32,
  paper: "LW",
  area: "D",
  title: "Promoters and pre-incorporation contracts",
  minutes: 15,
  syllabusRefs: ["D4(a)", "D4(b)"],
  intro:
    "A promoter owes fiduciary duties to a company that does not yet exist, and cannot make contracts for it either — two problems that both come from the same fact, and both have practical solutions the exam expects you to name.",
  outcomes: [
    "Define a promoter and state the duties owed",
    "Explain the remedies for breach of a promoter's duties",
    "Explain why a company cannot ratify a pre-incorporation contract",
    "Apply section 51 of the Companies Act 2006",
    "Advise on how to avoid personal liability for a pre-incorporation contract",
  ],
  sections: [
    {
      id: "promoters",
      heading: "Promoters and their duties",
      blocks: [
        {
          kind: "definition",
          term: "Promoter",
          md: "Anyone who **takes steps to form a company** and set it going — finding subscribers, negotiating for its business, instructing its formation. It is a question of **fact, not title**: a person is a promoter by what they do. Someone acting purely in a **professional capacity**, such as a solicitor or accountant carrying out instructions, is **not** a promoter.",
        },
        {
          kind: "list",
          title: "The duties a promoter owes",
          items: [
            "A **fiduciary duty** to the company being formed, so the promoter must not put personal interest above it.",
            "To **disclose any personal interest** in a transaction with the company — to an independent board, or to the members.",
            "**Not to make a secret profit** from the promotion, most obviously by selling their own property to the company at an undisclosed mark-up.",
            "To **account** for any profit properly made where it was disclosed and approved.",
          ],
        },
        {
          kind: "table",
          caption: "Remedies for breach",
          head: ["Remedy", "What it achieves"],
          rows: [
            ["**Rescission**", "The company sets aside the contract with the promoter and recovers what it paid — subject to the usual bars, including third-party rights (chapter 18)"],
            ["**Recovery of the secret profit**", "The promoter must account for the undisclosed profit, whether or not the contract is rescinded"],
            ["**Damages**", "For loss caused by the breach of fiduciary duty"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Disclosure is the answer, not abstention",
          md: "A promoter is **not** forbidden to profit — they are forbidden to profit **secretly**. Full disclosure to an **independent board**, or to the members, and approval, makes the profit legitimate. That is the practical advice a scenario is usually looking for: the promoter who sold their own land to the company at a mark-up is liable **because they concealed it**, and would have been safe had they disclosed and obtained approval.",
        },
      ],
      check: {
        q: "A promoter sells his own land to the company he is forming at twice what he paid, without telling anyone. What can the company do?",
        options: [
          "Nothing, since a promoter is entitled to profit from the promotion",
          "Rescind the contract and recover the secret profit, and claim damages for breach of fiduciary duty",
          "Only claim damages, the contract being valid",
          "Nothing until the promoter becomes a director",
        ],
        correct: 1,
        explain:
          "RESCIND and RECOVER THE SECRET PROFIT, with damages for breach of the FIDUCIARY duty. The wrong is the CONCEALMENT, not the profit — full disclosure to an independent board or to the members, followed by approval, would have made the same profit legitimate.",
      },
    },
    {
      id: "pre-incorporation",
      heading: "Pre-incorporation contracts",
      blocks: [
        {
          kind: "definition",
          term: "Pre-incorporation contract",
          md: "A contract purportedly made **on behalf of a company before it is incorporated**. The company **cannot be bound by it and cannot ratify it**, because it did not exist when the contract was made — so the second condition for ratification fails (chapter 28). *Kelner v Baxter* is the authority.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Section 51 CA 2006: the person who acted is personally liable",
          md: "Where a contract purports to be made by or on behalf of a company **at a time when it has not been formed**, the contract takes effect as one made with the **person purporting to act** for the company, and that person is **personally liable on it** — \"subject to any agreement to the contrary\". Three consequences follow. The company is **not** liable and gets no rights. The individual is **personally liable and can also sue** on it. And the **only escape** is the express agreement to the contrary those closing words allow.",
        },
        {
          kind: "table",
          caption: "How to avoid the problem",
          head: ["Solution", "How it works"],
          rows: [
            ["**Wait**", "Do not contract until the certificate of incorporation is issued. The obvious answer, and often the right one"],
            ["**Novation** after incorporation", "The company, the third party and the promoter agree to substitute the company for the promoter. The promoter is released and the company assumes the contract"],
            ["**A new contract** after incorporation", "The company enters a fresh contract on the same terms once it exists. Note this is NOT ratification — it is a new agreement, with its own consideration"],
            ["**An express agreement to the contrary**", "The contract states that the promoter is **not** personally liable, using the s.51 words. Commercially the third party may refuse, since it would then have nobody to sue"],
            ["**Buy an off-the-shelf company**", "Acquire a company already incorporated, so there is no pre-incorporation period at all"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Ratification is the wrong word, and using it loses the mark",
          md: "A company **cannot ratify** a pre-incorporation contract, so an answer saying \"the company ratified it once incorporated\" is wrong however commercially sensible the outcome was. What actually happens is a **novation** or a **new contract** — both of which need the **third party's agreement**, which ratification would not. The distinction matters practically too: if the third party refuses, the promoter stays personally liable and has no way out.",
        },
        {
          kind: "example",
          title: "Working the section 51 problem",
          scenario:
            "Averton is forming Averton Interiors Ltd. Before incorporation she signs three agreements \"for and on behalf of Averton Interiors Ltd (in formation)\": a £40,000 order for fabric from Bellhouse Ltd; a two-year office lease from Cotterill Estates, which contains a clause stating that Averton shall have no personal liability under it; and a £9,000 contract with Dunmere Ltd for a website. The company is incorporated three weeks later and its board resolves to \"ratify all pre-incorporation contracts\". Averton Interiors then fails to pay Bellhouse and Dunmere, and Cotterill wants its rent. Dunmere has meanwhile refused to deal with the company at all and wants to sue Averton.",
          steps: [
            { label: "Deal with the board's resolution first", detail: "It is INEFFECTIVE. A company CANNOT RATIFY a pre-incorporation contract (Kelner v Baxter) because it did not exist when the contract was made. Calling it ratification changes nothing." },
            { label: "The Bellhouse fabric order", detail: "Under s.51 the contract takes effect as one made with AVERTON PERSONALLY, and she is personally liable for the £40,000. Bellhouse may sue her; the company is not liable, though Bellhouse could accept a NOVATION if it chose." },
            { label: "The Cotterill lease", detail: "The lease contains an AGREEMENT TO THE CONTRARY, which is exactly what the closing words of s.51 permit. Averton is therefore NOT personally liable — but neither is the company, since it cannot ratify. Cotterill has contracted with nobody it can effectively sue, which is why third parties usually resist such clauses." },
            { label: "The Dunmere website contract", detail: "Section 51 again: Averton is PERSONALLY LIABLE for the £9,000, and Dunmere is entitled to sue her. Note the reciprocity — Averton could also SUE Dunmere on the contract, since it takes effect as hers." },
            { label: "Advise Averton on what to do now", detail: "Seek a NOVATION with Bellhouse and Dunmere so the company is substituted and she is released, or have the company enter NEW contracts on the same terms — but BOTH need the third party's consent, and Dunmere has already refused. She cannot escape unilaterally." },
            { label: "Advise on what she should have done", detail: "Waited for the certificate of incorporation, or bought an OFF-THE-SHELF company, or negotiated the s.51 exclusion into every contract as she did with Cotterill." },
          ],
          result:
            "Averton is **personally liable** to Bellhouse and Dunmere, **not** liable on the lease because of the express exclusion, and the board's purported **ratification is a nullity**. Her only routes out require **consent she may not get** — which is why the answer to the s.51 problem is always to avoid creating it.",
        },
      ],
      check: {
        q: "A promoter signs a contract for a company before incorporation. After incorporation the board resolves to ratify it. Who is liable?",
        options: [
          "The company, since the board ratified the contract",
          "The promoter personally under s.51 — a company cannot ratify a pre-incorporation contract",
          "Neither party, the contract being void",
          "Both jointly, once ratification takes place",
        ],
        correct: 1,
        explain:
          "The PROMOTER PERSONALLY under s.51 CA 2006. A company CANNOT RATIFY a pre-incorporation contract because it did not exist when the contract was made (Kelner v Baxter), so the board's resolution is ineffective. Transferring the contract needs a NOVATION or a NEW contract, both of which require the third party's agreement.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying a company ratified a pre-incorporation contract.",
      fix: "It cannot. Only novation or a new contract works, and both need the third party's consent.",
    },
    {
      trap: "Treating a promoter's profit as automatically improper.",
      fix: "The wrong is SECRECY. Disclosure to an independent board or the members, and approval, makes it legitimate.",
    },
    {
      trap: "Forgetting the \"agreement to the contrary\" in s.51.",
      fix: "An express exclusion defeats personal liability — but then the third party has nobody to sue.",
    },
    {
      trap: "Treating a professional adviser as a promoter.",
      fix: "Someone acting purely in a professional capacity on instructions is not a promoter.",
    },
  ],
  keyTerms: [
    { term: "Promoter", def: "Anyone who takes steps to form a company and set it going; a question of fact, not title." },
    { term: "Secret profit", def: "An undisclosed benefit taken from the promotion, which the promoter must account for." },
    { term: "Pre-incorporation contract", def: "A contract purportedly made for a company before it exists, which the company cannot ratify." },
    { term: "Section 51 CA 2006", def: "Makes the person purporting to act for an unformed company personally liable on the contract, subject to any agreement to the contrary." },
    { term: "Novation", def: "A tripartite agreement substituting the company for the promoter and releasing the promoter." },
    { term: "Off-the-shelf company", def: "An already incorporated company acquired to avoid any pre-incorporation period." },
  ],
  summary: [
    "A promoter is anyone taking steps to form a company, judged by conduct rather than title.",
    "Promoters owe fiduciary duties, must disclose personal interests and must not make secret profits.",
    "A company cannot be bound by or ratify a pre-incorporation contract.",
    "Section 51 makes the person who purported to act personally liable, subject to an agreement to the contrary.",
    "The solutions are to wait, novate, make a new contract, exclude liability expressly, or buy an off-the-shelf company.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can a company not ratify a pre-incorporation contract?", a: "Because ratification requires the principal to have existed when the act was done, and the company did not." },
    { q: "State the effect of s.51 CA 2006.", a: "The contract takes effect as one made with the person purporting to act for the company, who is personally liable on it, subject to any agreement to the contrary." },
    { q: "How can a promoter's profit be made legitimate?", a: "By full disclosure to an independent board or to the members, and their approval." },
    { q: "Name three ways to avoid personal liability on a pre-incorporation contract.", a: "Wait for incorporation, novate the contract after incorporation, or include an express agreement excluding personal liability; buying an off-the-shelf company also avoids the issue." },
  ],
}

/* ── Chapter 33 · D4(c)–D4(h) ──────────────────────────────────── */

export const LWE_TREE_33: StudyChapter = {
  id: "LWE-33",
  number: 33,
  paper: "LW",
  area: "D",
  title: "Registration, the constitution, the articles and company names",
  minutes: 18,
  syllabusRefs: ["D4(c)", "D4(d)", "D4(e)", "D4(f)", "D4(g)", "D4(h)"],
  intro:
    "Incorporation is a filing exercise, but what gets filed has consequences that last the company's life — the articles become a contract, the registers become a public record, and the name can be taken away.",
  outcomes: [
    "Describe the registration procedure and what the certificate of incorporation proves",
    "List the statutory books, records and returns a company must keep or file",
    "Explain the effect of the constitution and the section 33 contract",
    "Explain how the articles may be altered and the limits on alteration",
    "Explain the controls over company names and the remedies of a competitor",
  ],
  sections: [
    {
      id: "registration-records",
      heading: "Registration, and the records that follow",
      blocks: [
        {
          kind: "list",
          title: "What the application to register must contain",
          items: [
            "The **proposed name**, and whether liability is to be limited by shares or by guarantee, and whether the company is private or public.",
            "The intended address of the **registered office**, and which part of the UK it is to be situated in.",
            "The **articles of association**, unless the **model articles** are to apply by default.",
            "A **statement of capital and initial shareholdings**, or for a guarantee company a **statement of guarantee**.",
            "A **statement of the proposed officers** — the first directors and, where applicable, the secretary.",
            "A **statement of compliance** that the registration requirements have been met.",
            "A **memorandum of association**, which under CA 2006 is now only a short statement that the subscribers wish to form a company and agree to take at least one share each.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The certificate of incorporation is conclusive evidence",
          md: "Once issued, the certificate is **conclusive evidence** that the registration requirements were met and that the company is duly registered — so the company's existence cannot afterwards be challenged on the ground that some formality was defective. From that date the company is a **body corporate** with separate legal personality (chapter 31). A **plc** additionally needs a **trading certificate** before it may trade, which the certificate of incorporation does not supply. **Streamlined company registration** allows incorporation and the relevant tax registrations to be done through a single combined process.",
        },
        {
          kind: "table",
          caption: "The statutory books, records and returns",
          head: ["Requirement", "What it involves"],
          rows: [
            ["**Register of members**", "Names, addresses, shareholdings and dates. The register is the evidence of membership"],
            ["**Register of directors**, and a separate register of directors' **residential addresses**", "The residential addresses are protected information and not open to public inspection"],
            ["**Register of secretaries**", "Where the company has one"],
            ["**Register of people with significant control (PSC)**", "Those with significant influence or control over the company, so that ultimate ownership is visible"],
            ["**Register of charges**", "Charges created over the company's property, with the instruments (chapter 35)"],
            ["**Accounting records**", "Sufficient to show and explain the company's transactions and its financial position, retained for the prescribed period"],
            ["**Annual accounts and reports**", "Prepared, approved and filed with the registrar"],
            ["**Confirmation statement**", "Filed at least annually, confirming that the information held about the company is up to date"],
            ["**Minutes**", "Of general meetings and of directors' meetings, retained for the prescribed period"],
          ],
        },
      ],
      check: {
        q: "After incorporation it emerges that one of the registration formalities was defective. Can the company's existence be challenged?",
        options: [
          "Yes, the registration is void and must be repeated",
          "No — the certificate of incorporation is conclusive evidence that the requirements were met and the company is duly registered",
          "Yes, but only within twelve months",
          "Only if a creditor is prejudiced",
        ],
        correct: 1,
        explain:
          "NO. The CERTIFICATE OF INCORPORATION is CONCLUSIVE EVIDENCE that the registration requirements were complied with and that the company is duly registered, so its existence cannot be attacked afterwards for a defect in formality. Note a plc still needs a separate TRADING CERTIFICATE before trading.",
      },
    },
    {
      id: "constitution-names",
      heading: "The constitution, altering the articles, and names",
      blocks: [
        {
          kind: "definition",
          term: "The constitution",
          md: "Principally the **articles of association**, together with any resolutions and agreements affecting the constitution. Under CA 2006 the **memorandum** is reduced to a historical statement by the subscribers, so the **articles** now carry the constitutional content. Where a company registers no articles, the **model articles** apply by default, and where its articles are incomplete the model articles fill the gaps.",
        },
        {
          kind: "definition",
          term: "The section 33 contract",
          md: "The provisions of a company's constitution **bind the company and its members** to the same extent as if there were **covenants on the part of the company and of each member** to observe them. So the articles operate as a **statutory contract** — between the company and each member, and between the members themselves — but **only in respect of membership rights**.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Section 33 does not help an outsider, or a member in an outsider capacity",
          md: "This limit is regularly examined. The articles are enforceable only as to **membership** rights, so a member cannot use s.33 to enforce a provision affecting them in some **other** capacity — a provision in the articles that a named member shall be the company's solicitor gives them nothing enforceable, because being the solicitor is not a membership right. And a **non-member** cannot enforce the articles at all, since they are not party to the s.33 contract.",
        },
        {
          kind: "list",
          title: "Altering the articles",
          items: [
            "By **special resolution** of the members — a supermajority of **not less than 75%** of those voting.",
            "A copy of the **amended articles** and the resolution must be **filed with the registrar within 15 days**.",
            "**Entrenchment** is permitted: specified provisions may be made alterable only if additional conditions are met or a greater majority obtained. Entrenchment does not prevent amendment by **unanimous agreement of all members**, or by court order.",
            "The alteration must be **bona fide for the benefit of the company as a whole** — Lord Lindley's formula in *Allen v Gold Reefs* — so it may not be used simply to expropriate a minority.",
            "**No member's liability** to contribute to share capital may be increased without their **written consent**.",
            "Where an alteration **varies class rights**, the class consent procedure must also be followed (chapter 34).",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "A company cannot contract away its power to alter its articles",
          md: "An agreement with a member not to amend the articles does **not** deprive the company of the statutory power to do so. What the member gets is a **damages** claim for breach of that agreement — the alteration itself **stands**. Distinguishing \"the alteration is invalid\" from \"the alteration is valid but actionable\" is the point being tested.",
        },
        {
          kind: "table",
          caption: "Controls over company names",
          head: ["Control", "Effect"],
          rows: [
            ["**Compulsory ending**", "\"Limited\"/\"Ltd\", or \"public limited company\"/\"plc\""],
            ["**Same as an existing name** — s.66", "The registrar will **not register** a name that is the same as one already on the index"],
            ["**Too like an existing name** — s.67", "The registrar **may direct a change** where a name is \"the same as or too like\" an existing one, normally within twelve months of registration"],
            ["**Misleading information** on registration", "The registrar may direct a change"],
            ["**Sensitive, offensive or regulated words**", "Approval is needed for words implying a connection with government or a regulated activity; offensive names and those suggesting a criminal offence are prohibited"],
            ["**Company names adjudicator**", "May order a change where a name was registered **opportunistically**, to exploit another's goodwill"],
            ["**Passing off**", "A **common law** claim by a competitor whose goodwill is damaged, with an injunction as the usual objective (chapter 19)"],
            ["**Trade mark infringement**", "A **statutory** claim where a registered mark is used"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Registration of a name is not permission to use it",
          md: "The registrar's acceptance of a name means only that it passed the register's own checks. It is **no defence** to **passing off** or **trade mark infringement**, and the registrar may still direct a change under s.67, or the adjudicator order one. So a company that has been trading under an accepted name may still be forced to abandon it and pay damages — \"Companies House allowed it\" answers nothing.",
        },
        {
          kind: "example",
          title: "Testing alterations and a name",
          scenario:
            "Wenlake Ltd has five members. Its articles contain a pre-emption clause requiring a member wishing to transfer shares to offer them to the others first, and an entrenchment provision saying that clause may be altered only with the consent of all members. The three majority members pass a special resolution deleting the pre-emption clause so that one of them can sell to an outside buyer at a premium, and a second resolution requiring every member to subscribe for a further 2,000 shares. The articles also state that Prewitt, a member, shall be the company's solicitor for life; the board has just dismissed him. Separately, a competitor, Wenlake Joinery Ltd, has traded locally for nine years, and complains that Wenlake Ltd's newly registered name trades off its reputation.",
          steps: [
            { label: "Test the deletion against entrenchment", detail: "The pre-emption clause is ENTRENCHED, alterable only with the consent of ALL members. A special resolution of three of five does not satisfy that condition, so the deletion is INEFFECTIVE." },
            { label: "Test it against Allen v Gold Reefs", detail: "Even without entrenchment, the alteration was made so that a majority member could sell at a premium to an outsider, stripping the minority of a pre-emption right. That is very hard to justify as BONA FIDE FOR THE BENEFIT OF THE COMPANY AS A WHOLE." },
            { label: "Test the subscription resolution", detail: "Requiring members to subscribe for further shares INCREASES their liability to contribute to capital. That cannot be imposed without WRITTEN CONSENT, so it does not bind the dissenting members — though those who voted for it may be bound by their own agreement." },
            { label: "Advise Prewitt on the solicitor provision", detail: "He CANNOT enforce it. Section 33 makes the articles binding only as to MEMBERSHIP rights, and being the company's solicitor is an OUTSIDER capacity. The provision gives him nothing, however clearly the articles express it." },
            { label: "Advise on the name", detail: "Wenlake Joinery has NINE YEARS of local goodwill. Its routes are: ask the REGISTRAR to direct a change under s.67 as a name that is the same as or too like its own; apply to the COMPANY NAMES ADJUDICATOR if the registration was opportunistic; and sue for PASSING OFF at common law, seeking an injunction." },
            { label: "Dispose of the registration defence", detail: "That the registrar ACCEPTED the name is NO DEFENCE to passing off or trade mark infringement, and does not prevent a s.67 direction." },
          ],
          result:
            "The deletion **fails twice** — on entrenchment and on *Allen v Gold Reefs*; the subscription resolution **cannot bind** dissenters without written consent; Prewitt's provision is **unenforceable** because it is not a membership right; and the competitor has **three** separate routes on the name. The registration of the name protects nobody.",
        },
      ],
      check: {
        q: "The articles provide that a named member shall be the company's solicitor for life. The company dismisses him. Can he enforce the provision?",
        options: [
          "Yes, because the articles bind the company under s.33",
          "No — s.33 makes the articles enforceable only as to membership rights, and this is an outsider capacity",
          "Yes, provided he is still a member",
          "Only if the provision was entrenched",
        ],
        correct: 1,
        explain:
          "NO. The s.33 contract binds the company and members only in respect of MEMBERSHIP rights. Acting as the company's solicitor is an OUTSIDER capacity, so the provision is unenforceable however clearly the articles state it — and remaining a member does not change that.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Allowing the company's existence to be challenged for a registration defect.",
      fix: "The certificate of incorporation is CONCLUSIVE evidence of due registration.",
    },
    {
      trap: "Using s.33 to enforce an outsider right in the articles.",
      fix: "The statutory contract covers MEMBERSHIP rights only.",
    },
    {
      trap: "Treating an entrenched provision as alterable by special resolution.",
      fix: "Entrenchment requires the additional condition or greater majority, though unanimous agreement or a court order still works.",
    },
    {
      trap: "Saying an alteration is invalid because the company promised a member not to make it.",
      fix: "The company cannot contract away the statutory power. The alteration stands and the member's remedy is damages.",
    },
    {
      trap: "Treating acceptance of a name by the registrar as permission to use it.",
      fix: "It is no defence to passing off, to trade mark infringement, or to a s.67 direction.",
    },
  ],
  keyTerms: [
    { term: "Certificate of incorporation", def: "Conclusive evidence that the registration requirements were met and the company duly registered." },
    { term: "Model articles", def: "The default articles applying where a company registers none, and filling gaps in incomplete articles." },
    { term: "Section 33 contract", def: "The statutory contract by which the constitution binds the company and its members, as to membership rights only." },
    { term: "Entrenchment", def: "A provision making specified articles alterable only on additional conditions or a greater majority." },
    { term: "PSC register", def: "The register of people with significant control, making ultimate ownership visible." },
    { term: "Confirmation statement", def: "The at-least-annual filing confirming the information held about the company is up to date." },
    { term: "Company names adjudicator", def: "The body that may order a change of name registered opportunistically to exploit another's goodwill." },
  ],
  summary: [
    "Registration requires the name, registered office, articles, statements of capital, officers and compliance, and a memorandum.",
    "The certificate of incorporation is conclusive evidence of due registration; a plc also needs a trading certificate.",
    "A company must keep registers of members, directors, secretaries, PSCs and charges, plus accounting records, and file accounts and a confirmation statement.",
    "The articles bind under s.33 as to membership rights only, and are altered by special resolution filed within 15 days.",
    "An alteration must be bona fide for the benefit of the company as a whole, and names are controlled by ss.66-67, the adjudicator, passing off and trade mark law.",
  ],
  knowledgeDiagnostic: [
    { q: "What does the certificate of incorporation prove?", a: "It is conclusive evidence that the registration requirements were complied with and that the company is duly registered." },
    { q: "What are the limits of the s.33 contract?", a: "It binds the company and members only in respect of membership rights, and a non-member cannot enforce the articles at all." },
    { q: "How are the articles altered, and what constrains the alteration?", a: "By special resolution filed within 15 days; it must be bona fide for the benefit of the company as a whole, respect entrenchment, and cannot increase a member's liability without written consent." },
    { q: "Name three routes open to a competitor troubled by a company's name.", a: "Ask the registrar to direct a change under s.67, apply to the company names adjudicator, and sue for passing off — plus trade mark infringement if a mark is registered." },
  ],
}

export const LWE_TREE_AREA_D_PART3: StudyChapter[] = [LWE_TREE_32, LWE_TREE_33]
