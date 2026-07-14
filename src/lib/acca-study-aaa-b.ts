import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA · Area B — Professional and ethical considerations.
 * Advanced (Strategic Professional) depth: the five threats applied, the PIE
 * fee regime, long association and rotation, prohibited non-assurance services,
 * conflicts, confidentiality, liability and engagement acceptance.
 * Original content, IESBA/ACCA-aligned; no ACCA/Kaplan/BPP text reproduced.
 */

export const AAA_B: StudyChapter = {
  paper: "AAA",
  area: "B",
  title: "Professional and ethical considerations",
  minutes: 17,
  intro: "At AAA the ethics question is never 'name the five threats'. It is 'here is a messy client relationship — spot the threat, size it, and defend a safeguard a regulator would accept'. This chapter trains that judgement.",
  outcomes: [
    "Apply the five threats to complex, multi-service client relationships and evaluate whether safeguards reduce them to an acceptable level",
    "Apply the fee regime for public interest entities — the 15% dependence rule, contingent fees and lowballing",
    "Explain long association and the mandatory partner rotation and cooling-off periods for PIEs",
    "Identify non-assurance services that are prohibited outright for PIE audit clients",
    "Handle conflicts of interest, the duty of confidentiality and its exceptions, and manage professional liability",
    "Judge whether an engagement should be accepted, continued or resigned from",
  ],
  sections: [
    {
      id: "threats",
      heading: "The five threats — applied, not listed",
      blocks: [
        { kind: "text", md: "Every ethical problem in AAA reduces to one of **five threats** to the fundamental principles. The examiner assumes you can name them; the marks are for **identifying which threat a scenario creates, why, and how big it is**. A single fact can raise two threats at once, and the significance depends on the client's size, the fee involved and whether the client is a **public interest entity (PIE)** — a listed entity, or one defined as public interest because of its size, nature or number of stakeholders (banks, insurers)." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five threats to independence and objectivity",
          caption: "Advanced questions rarely announce the threat — you infer it from the facts.",
          data: {
            items: [
              { title: "Self-interest", sub: "The firm gains from the client — fees, a loan, shares, a contingent outcome" },
              { title: "Self-review", sub: "The firm audits its own earlier work or figures it helped produce" },
              { title: "Advocacy", sub: "The firm promotes the client's position — in a dispute, a listing, a negotiation" },
              { title: "Familiarity", sub: "Too close a relationship dulls professional scepticism — long tenure, family, gifts" },
              { title: "Intimidation", sub: "The firm is pressured — a dominant director, threat of dismissal or litigation" },
            ],
          },
        } },
        { kind: "text", md: "Safeguards fall into two families: those created by the **profession, legislation or regulation** (the IESBA Code, standards, monitoring, mandatory rotation) and those within the **firm's own systems** (independent review, a second partner, removing an individual from the team, resigning the service). At AAA a weak safeguard scores nothing — you must show the safeguard actually addresses **that** threat. If no safeguard can reduce the threat to an acceptable level, the only answer is to **decline or resign**." },
        { kind: "callout", tone: "key", title: "The AAA method", md: "For each fact: **name the threat → say which principle is at risk → judge the significance (money, PIE status, seniority) → propose a safeguard that actually neutralises it → if none works, withdraw.** Marks follow the reasoning, not the label." },
        { kind: "example", title: "Worked example — one fact, two threats", scenario: "Your firm audits Delta, a listed company. The finance director has just offered your audit engagement partner a non-executive directorship at a second company he chairs, and Delta has hinted the audit fee 'depends on a clean opinion this year'. Analyse.", steps: [
          { label: "Fact 1 — the NED offer", detail: "A personal benefit flowing to the partner from a party connected to the client creates a **self-interest** threat, and the ongoing relationship a **familiarity** threat to objectivity." },
          { label: "Fact 2 — fee conditional on opinion", detail: "Linking the fee to the audit outcome is effectively a **contingent fee**, creating self-interest, and the 'clean opinion or else' framing is an **intimidation** threat." },
          { label: "Significance", detail: "Delta is a **PIE**, the individual is the **engagement partner**, and the pressure targets the opinion itself — these are severe, not trivial, threats." },
          { label: "Safeguards", detail: "The partner must decline the directorship. The fee must be fixed independently of the outcome. The firm should document the intimidation and consider whether governance (audit committee) can insulate the team." },
        ], result: "The threats are significant and strike at the opinion. Removing the partner from the engagement and refusing both the directorship and the conditional fee are the minimum; if the intimidation persists, resignation is the professional answer." },
      ],
      check: {
        q: "A firm helped a PIE audit client design and implement the valuation model now used to value the client's investment property, which is material to the financial statements. In the following year's audit, which threat is MOST directly created?",
        options: [
          "Advocacy — the firm is promoting the client's valuation",
          "Self-review — the firm would be auditing figures produced by its own model",
          "Intimidation — the client could dismiss the firm",
          "Familiarity — the firm knows the client too well",
        ],
        correct: 1,
        explain: "Auditing figures the firm itself helped generate is the textbook self-review threat — the auditor cannot review its own work with proper scepticism. Because the amounts are material to a PIE, the valuation service is in fact prohibited outright, but the underlying threat being triggered is self-review. Advocacy is about promoting the client's position to third parties, which is not what has happened here.",
      },
    },
    {
      id: "fees",
      heading: "Fee issues — dependence, contingency and lowballing",
      blocks: [
        { kind: "text", md: "Money is the most common self-interest threat, and the Code is precise about it. Three fee problems recur at AAA: **fee dependence**, **contingent fees** and **lowballing**." },
        { kind: "callout", tone: "rule", title: "The 15% rule for PIEs", md: "Where the **total fees** from a **PIE audit client** (and its related entities) exceed **15% of the firm's total fees** for **two consecutive years**, a self-interest and intimidation threat arises. The firm must **disclose to those charged with governance** and arrange an independent review: a **pre-issuance review** (before this year's report is issued) or a **post-issuance review** (before next year's). If dependence continues, the position becomes untenable." },
        { kind: "text", md: "The logic is simple: a firm that would lose 15%+ of its income if it lost one client will struggle to challenge that client. The threshold is a **regulatory trigger for action**, not a hard cap — but a firm that ignores it after two years has no defence. For non-PIE clients the Code requires the firm to evaluate fee dependence and apply safeguards, but the fixed 15% / two-consecutive-year disclosure-and-independent-review discipline is specific to PIE audit clients." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Applying the 15% fee-dependence test to a PIE",
          caption: "Two consecutive years above the threshold force disclosure and an external quality review.",
          data: {
            steps: [
              { label: "Measure", sub: "Fees from PIE client ÷ firm total fees" },
              { label: "Year 1 > 15%?", sub: "Note the threat; monitor" },
              { label: "Year 2 > 15%?", sub: "Threat now significant" },
              { label: "Disclose", sub: "Tell those charged with governance" },
              { label: "Independent review", sub: "Pre- or post-issuance engagement quality review" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Contingent fees are prohibited", md: "A **contingent fee** — one set by reference to the outcome of the work (a percentage of a valuation, or a fee payable only on a 'clean' opinion) — is **not permitted for audit or other assurance engagements**. It creates an unmanageable self-interest threat: the firm profits from a particular result. For some non-assurance work a contingent fee may be acceptable only with strong safeguards." },
        { kind: "text", md: "**Lowballing** is quoting a fee below cost to win the audit, hoping to recover margin later through other services or future fee rises. It is not itself prohibited, but it raises a self-interest threat: the firm may cut corners to protect a thin margin, or become dependent on cross-selling. The safeguard is to demonstrate the engagement will still be staffed with **appropriate time, skill and quality** regardless of the fee, and that fee-setting does not compromise standards." },
        { kind: "table", caption: "The three fee problems at a glance", head: ["Issue", "Threat", "Response"], rows: [
          ["Fee dependence > 15% (PIE, 2 years)", "Self-interest, intimidation", "Disclose to TCWG + pre- or post-issuance review"],
          ["Contingent fee on an audit", "Self-interest", "Prohibited — refuse the arrangement"],
          ["Lowballing to win the audit", "Self-interest", "Not banned, but ensure quality/resourcing is unaffected"],
          ["Overdue fees resembling a loan", "Self-interest", "Treat like a loan; recover before signing the next report"],
        ] },
      ],
    },
    {
      id: "rotation",
      heading: "Long association and partner rotation",
      blocks: [
        { kind: "text", md: "The longer a partner audits the same client, the more a **familiarity** threat (and often a self-interest threat) builds: relationships soften scepticism and the auditor starts to see the numbers as the client does. The Code manages this through mandatory **rotation** and **cooling-off**, and the rules are strictest for PIEs." },
        { kind: "callout", tone: "rule", title: "The seven-year rule for PIEs", md: "A **key audit partner** on a **PIE** must not act for more than **seven cumulative years** (the 'time-on' period). After serving, they must **cool off** before returning to the engagement: **five years** for the **engagement partner**, **three years** for the **engagement quality reviewer (EQR)**, and **two years** for other key audit partners. During cooling-off they cannot participate in the audit or influence its outcome." },
        { kind: "text", md: "Rotation forces fresh eyes onto the engagement and breaks the personal loyalties that dull challenge. For **non-PIE** clients there is no fixed seven-year limit, but long association is still a threat to be assessed and safeguarded — for example, by rotating senior staff, adding an independent review, or having a partner not on the team review the work periodically." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Managing long association: PIE vs non-PIE",
          data: {
            leftTitle: "PIE audit client",
            rightTitle: "Non-PIE audit client",
            rows: [
              { aspect: "Fixed time limit", left: "Yes — 7 cumulative years for a key audit partner", right: "No fixed limit" },
              { aspect: "Cooling-off", left: "5 years (engagement partner), 3 (EQR), 2 (other KAPs)", right: "No mandated period" },
              { aspect: "Primary safeguard", left: "Mandatory rotation off the engagement", right: "Assess threat; rotate staff or add review" },
              { aspect: "During cooling-off", left: "No involvement or influence over the audit", right: "n/a" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "In the exam, watch for a partner described as 'having led the audit since flotation' or 'for the last nine years' on a listed client — that is a long-association / familiarity flag, and the correct response is rotation off the engagement, not merely 'be careful'." },
      ],
      check: {
        q: "The same partner has been the engagement partner on the audit of a listed company for eight consecutive years. Under the IESBA Code, what is required?",
        options: [
          "Nothing, provided an independent review is added to the file",
          "The partner must rotate off, having exceeded the seven-year limit, and cool off for five years",
          "The partner may continue for up to ten years before rotation",
          "The partner must resign from the firm",
        ],
        correct: 1,
        explain: "For a PIE, a key audit partner cannot serve beyond seven cumulative years. An engagement partner who has done eight has already breached the limit and must rotate off, then cool off for five years before any return. An independent review is a useful add-on but does not substitute for mandatory rotation, and rotating off the engagement is not the same as resigning from the firm.",
      },
    },
    {
      id: "nas",
      heading: "Prohibited non-assurance services for PIEs",
      blocks: [
        { kind: "text", md: "Providing **non-assurance services (NAS)** to an audit client is where self-review threats concentrate: if the firm helps build the numbers, it later audits its own work. The overriding rule is that a firm must never assume a **management responsibility** for any audit client — that alone would compromise independence. For **PIE audit clients** the Code goes further and **prohibits a defined list of services outright**, because for a PIE no safeguard is considered sufficient." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Non-assurance services PROHIBITED for a PIE audit client",
          caption: "For PIEs these are banned outright — safeguards cannot rescue them.",
          data: {
            items: [
              { title: "Accounting & bookkeeping", sub: "Preparing the accounting records or financial statements being audited" },
              { title: "Valuation services", sub: "Where the valuation is material and involves significant subjectivity" },
              { title: "Internal audit", sub: "Relating to internal controls over financial reporting" },
              { title: "IT systems", sub: "Designing/implementing systems that form part of financial reporting controls" },
              { title: "Taxation", sub: "Tax calculations material to the FS, and tax advocacy before a tribunal" },
              { title: "Corporate finance", sub: "Promoting/dealing in the client's shares, or advice with a material, subjective outcome" },
              { title: "Recruiting", sub: "Recruiting directors/senior management or key financial-reporting roles" },
              { title: "Legal & advocacy", sub: "Acting as advocate for the client in resolving a dispute or litigation" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Management responsibility — never, for any client", md: "The firm must not make management decisions, take responsibility for designing or running internal controls, authorise transactions, or prepare source data the client should own. This applies to **all** audit clients, PIE or not. A safeguard is to ensure an **informed member of management** takes responsibility for the outcome and any judgements." },
        { kind: "text", md: "For **non-PIE** audit clients, several of these services may be provided **with safeguards** — for example, using separate teams, adding an independent review, and ensuring management makes all decisions. The service is not automatically banned; the firm evaluates the self-review threat and applies safeguards, declining only where none reduces the threat to an acceptable level. The PIE list, by contrast, is a bright line: identify it, and the answer is simply 'the firm cannot provide this service to a PIE audit client'." },
        { kind: "example", title: "Worked example — the tempting NAS offer", scenario: "Your firm audits Orion, a listed insurer (a PIE). Management asks the firm to (a) prepare Orion's consolidated financial statements this year because staff have left, and (b) provide tax planning advice that would materially reduce Orion's reported tax charge. Advise.", steps: [
          { label: "(a) Preparing the financial statements", detail: "Preparing the very statements the firm will audit is a **self-review** and **management-responsibility** issue. For a **PIE** this accounting service is **prohibited** — no safeguard is available." },
          { label: "(b) Material tax planning", detail: "Tax advice that materially affects the reported tax charge (a figure in the audited numbers) is **prohibited** for a PIE; it creates both self-review and advocacy threats." },
          { label: "The correct response", detail: "Decline both engagements. Orion must resource the accounts preparation itself (or use a different firm) and obtain material tax advice elsewhere." },
        ], result: "Both requests are prohibited non-assurance services for a PIE audit client. The firm declines both — the self-review threat is unmanageable and the prohibition is absolute." },
      ],
    },
    {
      id: "conflicts-confidentiality",
      heading: "Conflicts of interest and confidentiality",
      blocks: [
        { kind: "text", md: "A **conflict of interest** arises when the firm's duties to one client compete with its duties to another, or with the firm's own interest — for example, auditing two clients bidding for the same target, or advising a buyer and a seller. The threat is to **objectivity** and to **confidentiality**, because information gained from one client could benefit another." },
        { kind: "text", md: "Managing a conflict starts with **disclosing** it to the affected parties and obtaining **consent** to act. Where the firm proceeds, safeguards include **separate engagement teams ('ethical walls')**, separate partners and staff who do not cross between the assignments, secure and segregated data, and independent review. If a conflict is so fundamental that no safeguard protects both clients' interests, the firm must **decline or resign** from one or both engagements." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Handling a conflict of interest",
          caption: "Identify → disclose → safeguard → and only then act (or decline).",
          data: {
            steps: [
              { label: "Identify", sub: "Whose interests compete?" },
              { label: "Disclose", sub: "Inform the affected clients" },
              { label: "Obtain consent", sub: "To act for both, if given" },
              { label: "Build safeguards", sub: "Separate teams, ethical walls, review" },
              { label: "Or decline", sub: "If no safeguard is adequate, withdraw" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Confidentiality — and its exceptions", md: "The firm must not disclose client information without **authority**, nor use it for personal advantage. But confidentiality is **not absolute**. Disclosure without consent is permitted where there is a **legal or professional duty or right** to disclose — for example, a **legal obligation** (money-laundering reporting, a court order, a statutory requirement) or where disclosure is in the **public interest** or needed to defend the firm in legal proceedings." },
        { kind: "text", md: "Distinguish **obligatory** disclosure (the law compels it — e.g. reporting suspected money laundering to the authorities, where 'tipping off' the client is itself an offence) from **voluntary** disclosure (the firm may disclose to protect the public interest or its own position, exercising judgement and usually taking legal advice first). Getting this distinction right is a recurring AAA marks earner." },
      ],
      check: {
        q: "During an audit, the engagement team forms a genuine suspicion that a client's director is laundering the proceeds of fraud. What should the firm do?",
        options: [
          "Keep it confidential — client information is protected without exception",
          "Confront the director and give them a chance to explain before acting",
          "Report the suspicion to the relevant authority and avoid tipping off the client",
          "Qualify the audit opinion and take no further action",
        ],
        correct: 2,
        explain: "Money laundering is an exception to confidentiality: the firm has a legal OBLIGATION to report the suspicion to the appropriate authority (via its MLRO). Warning the director would be 'tipping off', a separate criminal offence, so the firm must not confront them. Confidentiality is not absolute where the law compels disclosure, and a qualified opinion does not discharge the reporting duty.",
      },
    },
    {
      id: "liability-acceptance",
      heading: "Liability, engagement acceptance and advertising",
      blocks: [
        { kind: "text", md: "The firm is exposed to **professional liability**: a negligence claim from the client for a breach of the engagement contract, and potentially from **third parties** who relied on the audited accounts. Third-party liability generally requires the firm to have known the party would rely on the report for a specific purpose (a **proximity / assumption-of-responsibility** test). Firms manage this exposure in several legitimate ways." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Ways to limit professional liability",
          caption: "Used together, these reduce exposure without dodging genuine responsibility.",
          data: {
            items: [
              { title: "Engagement letter", sub: "Defines scope, responsibilities and the limits of the work agreed" },
              { title: "Liability cap / LLA", sub: "A liability limitation agreement, where law permits and it is fair & reasonable" },
              { title: "Disclaimer (Bannerman)", sub: "Wording stating the report is for members, not third parties" },
              { title: "Professional indemnity insurance", sub: "Cover against claims that do succeed" },
              { title: "Incorporation as an LLP", sub: "Limits partners' personal liability for the firm's debts" },
              { title: "Quality control", sub: "Doing the work well is the best defence of all" },
            ],
          },
        } },
        { kind: "text", md: "Before taking on any client the firm runs **acceptance procedures**: assessing the integrity of management and owners, whether the firm is **competent** and has the **resources and time**, whether it can be **independent**, and the risk profile of the engagement. Where a predecessor auditor exists, the firm seeks the client's permission to contact them (**professional clearance**); a refusal, or a hostile response, is itself a warning sign. **Continuance** applies the same test each year — a firm should not keep a client whose risk, integrity or conduct has deteriorated beyond what safeguards can address." },
        { kind: "callout", tone: "tip", title: "Accept, continue, or resign", md: "Acceptance is not a one-off. Each year the firm re-asks: can we still be **independent, competent and safe** here? If a threat has grown beyond any safeguard — unmanageable fee dependence, a director's dishonesty, relentless intimidation — the professional answer is to **resign**, not to compromise the opinion." },
        { kind: "text", md: "**Advertising and publicity** by firms is permitted but must be **honest, truthful and not misleading**; it must not make **disparaging** references to competitors, claim superiority that cannot be substantiated, or bring the profession into disrepute. **Fee quotes** may be advertised, but the firm must be able to deliver the work to the required standard at that price — which loops back to lowballing." },
      ],
    },
  ],
  examTraps: [
    { trap: "Just naming the five threats without applying them.", fix: "Name the threat, tie it to a principle, size it (money, PIE status, seniority), then propose a safeguard that actually neutralises THAT threat." },
    { trap: "Treating the 15% fee rule as a single-year, hard cap.", fix: "It bites when PIE fees exceed 15% of firm income for TWO consecutive years, and triggers disclosure to TCWG plus a pre- or post-issuance review — it is an action trigger, not an absolute ceiling." },
    { trap: "Quoting one cooling-off period for all PIE partners.", fix: "After the seven-year time-on limit: engagement partner cools off 5 years, EQR 3 years, other key audit partners 2 years." },
    { trap: "Applying the PIE prohibited-NAS list to non-PIE clients.", fix: "For non-PIEs many of these services are allowed WITH safeguards. The outright ban (accounting, material valuations, internal audit over FR, etc.) is specific to PIE audit clients." },
    { trap: "Saying confidentiality is absolute.", fix: "Disclosure is permitted or required where there is a legal or professional duty/right — money-laundering reporting, court orders, public interest, or defending the firm." },
    { trap: "Thinking a low audit fee (lowballing) is automatically prohibited.", fix: "Lowballing is not banned; it raises a self-interest threat. The safeguard is proving quality and resourcing are unaffected — unlike a contingent fee, which IS prohibited for assurance work." },
  ],
  keyTerms: [
    { term: "Public interest entity (PIE)", def: "A listed entity, or one designated public interest by its size, nature or number of stakeholders (e.g. banks, insurers); the strictest independence rules apply to it." },
    { term: "Self-review threat", def: "The threat that a firm will not properly evaluate work it (or the firm) previously performed or figures it helped produce — the core risk in non-assurance services." },
    { term: "Contingent fee", def: "A fee set by reference to the outcome of the work; prohibited for audit and other assurance engagements because it creates an unmanageable self-interest threat." },
    { term: "Cooling-off period", def: "The time a rotated key audit partner on a PIE must stay off the engagement — 5 years (engagement partner), 3 (EQR), 2 (other key audit partners)." },
    { term: "Management responsibility", def: "Making decisions or judgements that are properly management's; a firm must never assume it for any audit client, PIE or not." },
    { term: "Professional clearance", def: "Contacting the predecessor auditor, with the client's permission, before accepting an engagement; refusal or a hostile reply is a warning sign." },
  ],
  summary: [
    "Ethics at AAA is applied judgement: name the threat, tie it to a principle, size it, and defend a safeguard — or decline/resign if none works.",
    "Fees: a PIE client above 15% of firm income for two consecutive years triggers disclosure and an independent review; contingent fees on assurance work are prohibited; lowballing is allowed only if quality is unaffected.",
    "Long association on a PIE: a key audit partner rotates off after 7 cumulative years, with cooling-off of 5 years (engagement partner), 3 (EQR) and 2 (other KAPs).",
    "For PIE audit clients a defined list of non-assurance services is prohibited outright (accounting, material valuations, internal audit over financial reporting, certain IT, tax and corporate-finance work); management responsibility is barred for all clients.",
    "Manage conflicts with disclosure, consent and ethical walls; confidentiality yields to legal or professional duties (money-laundering reporting, court orders); limit liability through engagement letters, caps, disclaimers, PII and LLP status; and re-test acceptance every year, resigning where threats outgrow safeguards.",
  ],
}
