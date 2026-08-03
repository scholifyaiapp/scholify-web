import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-GLOBAL · the rest of Area E, and Area F.
 * Chapters 23–28: loan capital and charges, capital maintenance and dividends, then
 * directors, other officers, and meetings and resolutions.
 *
 * Jurisdiction-neutral throughout: the principle and its elements, with a direction to
 * use the threshold the scenario supplies wherever a domestic companies act fixes one.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 23 · E2 ───────────────────────────────────────────── */

export const LWG_TREE_23: StudyChapter = {
  id: "LWG-23",
  number: 23,
  paper: "LW",
  area: "E",
  title: "Loan capital, debentures and charges",
  minutes: 16,
  syllabusRefs: ["E2(a)", "E2(b)", "E2(c)", "E2(d)", "E2(e)"],
  intro:
    "Borrowing instead of issuing shares changes who bears the risk, who has a vote, and — crucially — who gets paid first if it all goes wrong.",
  outcomes: [
    "Define a company's borrowing powers",
    "Explain the meaning of loan capital and of a debenture",
    "Distinguish loan capital from share capital and compare the rights of shareholders and debenture holders",
    "Explain the concept of a company charge and distinguish fixed from floating charges",
    "Describe the need for, and the procedure on, registration of company charges",
  ],
  sections: [
    {
      id: "loan-capital",
      heading: "Borrowing powers, debentures, and how debt differs from equity",
      blocks: [
        {
          kind: "definition",
          term: "Debenture",
          md: "A **document acknowledging a company's indebtedness**, whether or not secured on its assets. Loosely, the loan itself; strictly, the instrument. Debentures may be issued **singly** to one lender or as a **series** to many, and may be **secured** by a charge or entirely **unsecured**.",
        },
        {
          kind: "list",
          title: "Borrowing powers",
          items: [
            "A **trading company** has an implied power to borrow for the purposes of its business, and to give security. In most modern systems a company has **unrestricted objects** unless its articles restrict them.",
            "**Restrictions live in the articles**, and bind the directors internally. A third party dealing in good faith is generally **not** affected by a constitutional limit on the directors' powers.",
            "**Borrowing beyond a limit in the articles** is therefore usually enforceable by the lender, while exposing the directors to the company for breach of duty — the same pattern as chapter 17's authority problem.",
          ],
        },
        {
          kind: "table",
          caption: "Shareholder against debenture holder",
          head: ["", "Shareholder", "Debenture holder"],
          rows: [
            ["**Status**", "**Member** and part-owner", "**Creditor**"],
            ["**Return**", "**Dividend**, at the directors' discretion and only out of distributable profits", "**Interest**, payable whether or not there are profits"],
            ["**Vote**", "Ordinarily yes", "**No** vote at general meetings"],
            ["**On winding up**", "Paid **last**, after all creditors", "Paid as a **creditor**, ahead of members; a secured holder ranks on its security"],
            ["**Capital repayment**", "Only on winding up or a permitted reduction or buy-back", "**On the redemption date**, as a contractual right"],
            ["**Security**", "None", "May hold a **fixed or floating charge**"],
            ["**Accounting treatment of the return**", "A distribution", "A **finance cost**, reducing profit"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Interest is payable whatever the results",
          md: "This is the commercial heart of the distinction. A dividend can be passed over in a bad year; **interest cannot**. So borrowing raises the fixed cost the company must meet before it earns anything for its members, which is why gearing is a measure of risk — and why a heavily geared company in a downturn ends up in chapter 29.",
        },
      ],
      check: {
        q: "A company has no profits this year. What is the position of its debenture holders and its ordinary shareholders?",
        options: [
          "Neither is entitled to a payment",
          "Debenture holders remain entitled to their interest; ordinary shareholders have no entitlement to a dividend",
          "Both must be paid out of capital",
          "Shareholders rank ahead of debenture holders in a loss-making year",
        ],
        correct: 1,
        explain:
          "INTEREST is a contractual debt payable whether or not there are profits. A DIVIDEND may only be paid out of distributable profits and is at the directors' discretion, so the shareholders get nothing. Shareholders never rank ahead of creditors.",
      },
    },
    {
      id: "charges",
      heading: "Fixed and floating charges, and registration",
      blocks: [
        {
          kind: "definition",
          term: "Company charge",
          md: "**Security** given by a company over its assets for a debt, entitling the holder to be paid out of those assets in priority to unsecured creditors. A **fixed** charge attaches to **specific, identified assets**; a **floating** charge hovers over a **class of assets** that the company may continue to deal with in the ordinary course of business until the charge **crystallises**.",
        },
        {
          kind: "table",
          caption: "The comparison that decides these questions",
          head: ["", "Fixed charge", "Floating charge"],
          rows: [
            ["**What it covers**", "Specific identified assets — land, a named machine", "A **class** of assets, typically changing — inventory, receivables, or the whole undertaking"],
            ["**Dealing with the assets**", "The company **cannot** dispose of them free of the charge without consent", "The company **may** deal with them in the ordinary course until crystallisation"],
            ["**Priority**", "**Higher** — ranks ahead of a floating charge over the same assets, even a later fixed charge in some systems", "**Lower**, and typically subordinated to preferential creditors on insolvency"],
            ["**Crystallisation**", "Not applicable", "Converts to a **fixed** charge on the assets then in the class"],
            ["**Suits**", "Long-term assets the company will keep", "Circulating assets the company must be free to trade"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "When a floating charge crystallises",
          items: [
            "The company goes into **liquidation**.",
            "The company **ceases to carry on business**.",
            "A **receiver or administrator is appointed**, or the holder takes steps to enforce.",
            "**An event specified in the charge instrument** occurs, where the instrument provides for automatic crystallisation.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The floating charge holder's two weaknesses",
          md: "First, **priority**: a floating charge ranks behind a fixed charge over the same assets and behind preferential claims, so the holder may recover little. Second, **the assets can disappear** — until crystallisation the company may sell the very inventory and receivables the charge covers, in the ordinary course of business. That is the price of giving the company freedom to trade, and it is why lenders take fixed charges wherever the asset allows.",
        },
        {
          kind: "list",
          style: "number",
          title: "Registration of charges: the need and the procedure",
          items: [
            "**Why.** Registration gives **public notice** so that other prospective lenders can discover existing security, and it fixes **priority** between competing charge holders.",
            "**Who and when.** Particulars of the charge, with the instrument, must be delivered to the registrar within the **prescribed period** after creation — the scenario will state it. The company or any interested person may register.",
            "**Consequence of failing to register.** The charge is generally **void against a liquidator, administrator and other creditors** — so the lender is reduced to an **unsecured creditor**, though the **debt itself remains valid and may become immediately repayable**.",
            "**The company's own register.** The company keeps copies of charge instruments available for inspection, alongside the registrar's record.",
            "**Release.** On satisfaction of the debt, a statement is filed so the register shows the charge discharged.",
          ],
        },
        {
          kind: "example",
          title: "Working a priority problem",
          scenario:
            "Ravenglass Ltd borrows $500,000 from Northbank in January, secured by a floating charge over its whole undertaking, duly registered. In April it borrows $300,000 from Solway Finance, secured by a fixed charge over its freehold warehouse, duly registered. In June it borrows $150,000 from Threlkeld Credit secured by a fixed charge over the same warehouse; Threlkeld does not register. In September Ravenglass goes into liquidation. The warehouse realises $600,000; inventory and receivables realise $250,000. Preferential claims total $90,000 and unsecured trade creditors are owed $700,000.",
          steps: [
            { label: "Deal with the unregistered charge first", detail: "Threlkeld failed to register, so its charge is VOID against the liquidator and the other creditors. Its $150,000 debt survives but ranks as UNSECURED. That single failure costs it its security." },
            { label: "Apply the warehouse proceeds", detail: "Solway's registered FIXED charge over the warehouse takes priority over Northbank's floating charge on that asset. Solway takes $300,000 of the $600,000." },
            { label: "Deal with the warehouse surplus", detail: "The remaining $300,000 falls into the assets caught by Northbank's floating charge over the whole undertaking." },
            { label: "Apply the floating charge assets", detail: "Available to the floating charge: $300,000 surplus plus $250,000 of inventory and receivables = $550,000. But PREFERENTIAL claims of $90,000 rank AHEAD of a floating charge, leaving $460,000 for Northbank against its $500,000 — a shortfall of $40,000." },
            { label: "Identify the unsecured pool", detail: "Nothing is left. Unsecured creditors — the $700,000 of trade creditors, Threlkeld's $150,000, and Northbank's $40,000 shortfall — share whatever remains, which here is nil." },
            { label: "State the lesson", detail: "Solway is paid in full because it took a FIXED charge and REGISTERED it. Northbank is nearly paid because it registered but took only a floating charge. Threlkeld recovers almost nothing because it did not register." },
          ],
          result:
            "Solway $300,000, preferential creditors $90,000, Northbank $460,000, everyone else nothing. Three rules produce that outcome: an **unregistered charge is void against the liquidator**, a **fixed charge beats a floating charge** on the same asset, and **preferential claims rank ahead of a floating charge**. Registration is the cheapest step in the whole transaction and the most expensive to omit.",
        },
      ],
      check: {
        q: "A lender takes a fixed charge but fails to register it within the prescribed period. The company goes into liquidation. What is the lender's position?",
        options: [
          "The charge is valid and it is paid as a secured creditor",
          "The charge is void against the liquidator and other creditors, so it ranks as unsecured — though the debt itself survives",
          "The debt is extinguished altogether",
          "It ranks after preferential creditors but ahead of other unsecured creditors",
        ],
        correct: 1,
        explain:
          "The CHARGE is void against the liquidator, administrator and other creditors, so the lender becomes UNSECURED. The DEBT itself remains valid — and typically becomes immediately repayable — but the security is lost. It gets no intermediate ranking.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating a debenture holder as a member with a vote.",
      fix: "A debenture holder is a CREDITOR: interest whatever the profits, no vote, and paid ahead of members on winding up.",
    },
    {
      trap: "Saying an unregistered charge makes the loan void.",
      fix: "The CHARGE is void against the liquidator and other creditors; the DEBT survives and is usually immediately repayable.",
    },
    {
      trap: "Ranking a floating charge ahead of preferential creditors.",
      fix: "Preferential claims rank AHEAD of a floating charge, which is one of its two structural weaknesses.",
    },
    {
      trap: "Assuming a company cannot deal with assets under a floating charge.",
      fix: "It may, in the ordinary course, until the charge CRYSTALLISES.",
    },
    {
      trap: "Letting a constitutional borrowing limit defeat a good-faith lender.",
      fix: "It binds the directors internally. A third party dealing in good faith is generally unaffected.",
    },
  ],
  keyTerms: [
    { term: "Debenture", def: "A document acknowledging a company's indebtedness, whether or not secured, issued singly or as a series." },
    { term: "Fixed charge", def: "Security over specific identified assets, which the company cannot dispose of free of the charge without consent." },
    { term: "Floating charge", def: "Security over a class of assets the company may deal with in the ordinary course until the charge crystallises." },
    { term: "Crystallisation", def: "The conversion of a floating charge into a fixed charge on liquidation, cessation of business, appointment of a receiver or administrator, or a specified event." },
    { term: "Registration of charges", def: "Delivery of particulars and the instrument to the registrar within the prescribed period, giving public notice and fixing priority; failure makes the charge void against the liquidator and other creditors." },
  ],
  summary: [
    "A debenture acknowledges indebtedness and may be secured or unsecured, issued singly or in a series.",
    "A trading company has implied power to borrow; restrictions in the articles bind the directors, not a good-faith lender.",
    "Debenture holders are creditors: interest whatever the profits, no vote, and priority over members.",
    "A fixed charge attaches to identified assets; a floating charge covers a class the company may still trade.",
    "A floating charge crystallises on liquidation, cessation of business, appointment of a receiver or administrator, or a specified event.",
    "A fixed charge outranks a floating charge on the same asset, and preferential claims outrank a floating charge.",
    "An unregistered charge is void against the liquidator and other creditors, though the debt survives.",
  ],
  knowledgeDiagnostic: [
    { q: "Give three differences between a shareholder and a debenture holder.", a: "The shareholder is a member, the holder a creditor; the shareholder receives a discretionary dividend out of profits, the holder contractual interest regardless; the shareholder votes and is paid last, the holder does not vote and is paid ahead of members." },
    { q: "What is crystallisation and what triggers it?", a: "Conversion of a floating charge into a fixed charge, triggered by liquidation, cessation of business, appointment of a receiver or administrator, or an event specified in the instrument." },
    { q: "Why is registration of a charge necessary?", a: "It gives public notice to other prospective lenders and fixes priority. Without it the charge is void against the liquidator, administrator and other creditors." },
    { q: "What are the two structural weaknesses of a floating charge?", a: "It ranks behind a fixed charge over the same assets and behind preferential claims; and the company may dispose of the charged assets in the ordinary course until crystallisation." },
    { q: "Does failure to register destroy the lender's debt?", a: "No. Only the security is lost; the debt remains valid and typically becomes immediately repayable." },
  ],
  furtherStudy: [
    "Chapter 29 applies these priorities in a liquidation.",
    "Chapter 22 covers the equity alternative to borrowing.",
  ],
}

/* ── Chapter 24 · E3 ───────────────────────────────────────────── */

export const LWG_TREE_24: StudyChapter = {
  id: "LWG-24",
  number: 24,
  paper: "LW",
  area: "E",
  title: "Capital maintenance and dividend law",
  minutes: 15,
  syllabusRefs: ["E3(a)", "E3(b)"],
  intro:
    "Creditors lend to a company on the strength of its capital. The doctrine of capital maintenance is the law's promise that the members cannot simply take that capital back out.",
  outcomes: [
    "Explain the doctrine of capital maintenance and the reason for it",
    "Explain capital reduction and the routes by which it may lawfully occur",
    "Explain the rules governing distribution of dividends in private and public companies",
    "Identify the consequences of an unlawful distribution",
  ],
  sections: [
    {
      id: "maintenance",
      heading: "The doctrine, and the permitted exceptions",
      blocks: [
        {
          kind: "definition",
          term: "Capital maintenance",
          md: "The principle that a company's **share capital** — the amount subscribed by members, together with restricted reserves such as share premium — must be **kept within the company** and not returned to members except by a procedure the law permits. Creditors have no claim on the members personally, so the capital is the fund they look to.",
        },
        {
          kind: "table",
          caption: "The permitted routes for capital to leave",
          head: ["Route", "The protection built in"],
          rows: [
            ["**Reduction of capital** by special resolution", "Either a **court-confirmed** procedure, or — where a jurisdiction allows — a **solvency statement** by the directors; creditors may object in the court route"],
            ["**Purchase of own shares** (buy-back)", "Funded out of **distributable profits** or a fresh issue, with limited scope for a private company to use capital subject to strict conditions and creditor safeguards"],
            ["**Redemption** of redeemable shares", "Same funding constraints as a buy-back, and the terms must have been set when the shares were issued"],
            ["**Distribution of profits** as a dividend", "Only out of **distributable profits**, never out of capital"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the solvency statement matters",
          md: "Where a jurisdiction permits reduction on a **solvency statement**, the directors state that the company can pay its debts as they fall due over the coming period. That substitutes **directors' personal responsibility** for the court's supervision — a false statement exposes them to liability, and sometimes to an offence. So the protection has not been removed, only relocated onto the people best placed to know.",
        },
        {
          kind: "list",
          title: "Why capital reduction might legitimately be wanted",
          items: [
            "**To eliminate accumulated losses**, so that the balance sheet reflects reality and future profits become distributable rather than absorbed by a deficit.",
            "**To return surplus capital** the company genuinely does not need.",
            "**To cancel unpaid capital** it no longer intends to call.",
            "**To facilitate a reorganisation**, buy-out or scheme.",
          ],
        },
      ],
      check: {
        q: "Why does the law restrict the return of share capital to members?",
        options: [
          "To protect the members' investment",
          "Because creditors have no recourse against members personally, so the capital is the fund they rely on",
          "To increase the tax the company pays",
          "Because share capital cannot be measured reliably",
        ],
        correct: 1,
        explain:
          "Because CREDITORS cannot pursue the members — limited liability means they must look to the COMPANY, and its capital is the fund they lent against. Capital maintenance stops the members withdrawing that fund except by a procedure with creditor safeguards.",
      },
    },
    {
      id: "dividends",
      heading: "Dividends: what may be distributed, and by whom",
      blocks: [
        {
          kind: "definition",
          term: "Distributable profits",
          md: "The statutory formula (**CA 2006 s.830(2)** and its equivalents) is \"accumulated, realised profits, so far as not previously distributed or capitalised, less accumulated, realised losses, so far as not previously written off\". Two features matter: the test is **cumulative**, not year by year, and the profits must be **realised** — an unrealised revaluation gain is not distributable.",
        },
        {
          kind: "table",
          caption: "The two tests",
          head: ["", "Private company", "Public company"],
          rows: [
            ["**Basic test**", "Distributable profits as defined", "The **same** test, plus a second one"],
            ["**Additional test**", "—", "A distribution may only be made if, **after** it, **net assets are not less than the aggregate of called-up share capital and undistributable reserves**"],
            ["**Practical effect**", "Accumulated realised profits may be distributed", "Unrealised **losses** must effectively be absorbed first, so a public company can be barred from paying even where it has realised profits"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "The mechanics of declaring a dividend",
          items: [
            "The **directors recommend** a final dividend and the **members approve** it by ordinary resolution — and the members generally cannot vote **more** than the directors recommend.",
            "**Interim** dividends are usually paid by the directors alone under the articles.",
            "A dividend must be justified by reference to **relevant accounts** — normally the last annual accounts, or interim accounts where those are insufficient.",
            "**Once declared**, a final dividend becomes a **debt** owed to the members.",
            "A dividend is a **distribution**, deducted from retained earnings in the statement of changes in equity — never an expense.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The consequences of an unlawful distribution",
          md: "**The member** who receives it, knowing or having reasonable grounds to believe it was unlawful, is liable to **repay** it. **The directors** who authorised it may be liable to make good the amount to the company, for breach of their duty and for authorising a distribution the company could not lawfully make. So an unlawful dividend is recoverable from **both** sides, and \"the members have spent it\" is not an answer.",
        },
        {
          kind: "example",
          title: "Testing a proposed dividend",
          scenario:
            "Kirkstone plc, a public company, has called-up share capital of $2,000,000, share premium of $400,000, a revaluation surplus of $250,000, accumulated realised profits of $760,000 and accumulated realised losses brought forward of $180,000. Its net assets are $2,900,000. The directors propose a dividend of $600,000. A shareholder also asks whether the revaluation surplus could be paid out, and what would happen if the dividend were paid and later found unlawful.",
          steps: [
            { label: "Apply the basic distributable profits test", detail: "Accumulated realised profits $760,000 less accumulated realised losses $180,000 = $580,000 of distributable profits. The proposed $600,000 already EXCEEDS that by $20,000." },
            { label: "Apply the public company's additional test", detail: "Undistributable reserves are share premium $400,000 and the revaluation surplus $250,000 = $650,000. Called-up capital $2,000,000 + $650,000 = $2,650,000. Net assets after a $600,000 dividend would be $2,900,000 − $600,000 = $2,300,000 — BELOW $2,650,000, so the test fails." },
            { label: "State the maximum lawful dividend", detail: "The additional test permits a distribution only down to net assets of $2,650,000, so at most $250,000. That is lower than the $580,000 the basic test would allow, so for this public company the ADDITIONAL test is the binding constraint." },
            { label: "Answer the revaluation surplus question", detail: "NO. It is an UNREALISED gain and an undistributable reserve. It cannot be paid out as a dividend, and it is one of the reserves the additional test protects." },
            { label: "Explain the consequences of paying $600,000", detail: "The distribution would be unlawful. MEMBERS who knew or had reasonable grounds to believe that would be liable to REPAY, and the DIRECTORS who authorised it could be required to make good the amount to the company." },
            { label: "Give the practical advice", detail: "Declare no more than $250,000; or realise assets, or reduce capital by the permitted procedure, before distributing more." },
          ],
          result:
            "A maximum lawful dividend of $250,000, not the $600,000 proposed. The lesson is that for a **public** company the additional net-assets test frequently bites **before** the distributable profits test — so testing only accumulated realised profits gives the wrong answer, and an unrealised revaluation surplus is never the source of a dividend.",
        },
      ],
      check: {
        q: "A company has accumulated realised profits of $400,000, accumulated realised losses of $90,000 and an unrealised revaluation surplus of $200,000. What are its distributable profits?",
        options: ["$600,000", "$510,000", "$310,000", "$400,000"],
        correct: 2,
        explain:
          "$400,000 − $90,000 = $310,000. The revaluation surplus is UNREALISED and therefore not distributable. Note the test is cumulative — accumulated realised profits less accumulated realised losses — not this year's result.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating an unrealised revaluation surplus as distributable.",
      fix: "Under s.830(2) distributable profits are accumulated REALISED profits less accumulated realised losses. A revaluation surplus is an undistributable reserve.",
    },
    {
      trap: "Applying only the distributable profits test to a public company.",
      fix: "A public company faces the ADDITIONAL net-assets test, which frequently bites first.",
    },
    {
      trap: "Testing the current year's profit rather than the cumulative position.",
      fix: "The test is accumulated: prior losses must be made good before profits become distributable.",
    },
    {
      trap: "Assuming only the directors are liable for an unlawful distribution.",
      fix: "A member who knew or had reasonable grounds to believe it unlawful must repay it, and the authorising directors may have to make good the amount.",
    },
    {
      trap: "Saying capital can never be reduced.",
      fix: "It can, by a permitted procedure — court confirmation or a solvency statement — and by buy-back or redemption within the funding rules.",
    },
    {
      trap: "Treating a dividend as an expense.",
      fix: "It is a distribution, shown in the statement of changes in equity, and becomes a debt to members once declared.",
    },
  ],
  keyTerms: [
    { term: "Capital maintenance", def: "The doctrine that share capital and restricted reserves must be kept in the company and returned to members only by a permitted procedure." },
    { term: "Reduction of capital", def: "A permitted return or cancellation of capital, by special resolution with court confirmation or a directors' solvency statement." },
    { term: "Distributable profits", def: "s.830(2) — accumulated realised profits not previously distributed or capitalised, less accumulated realised losses not previously written off." },
    { term: "Undistributable reserves", def: "Reserves such as share premium and the revaluation surplus that may not be paid out as a dividend." },
    { term: "Public company net-assets test", def: "The additional requirement that after a distribution net assets be no less than called-up share capital plus undistributable reserves." },
    { term: "Unlawful distribution", def: "A distribution exceeding what the law permits, repayable by a knowing member and recoverable from the authorising directors." },
  ],
  summary: [
    "Capital maintenance keeps the fund creditors lent against inside the company.",
    "Capital may leave only by reduction, buy-back, redemption or a lawful dividend, each with safeguards.",
    "A solvency statement relocates the protection onto the directors rather than removing it.",
    "Under s.830(2), distributable profits are accumulated realised profits less accumulated realised losses.",
    "An unrealised revaluation surplus is not distributable.",
    "A public company must also satisfy the net-assets test, which often binds before the profits test.",
    "An unlawful distribution is repayable by a knowing member and recoverable from the authorising directors.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does capital maintenance exist?", a: "Because limited liability leaves creditors with no claim against members, so the company's capital is the fund they rely on and must not simply be returned." },
    { q: "Define distributable profits.", a: "s.830(2) — accumulated realised profits not previously distributed or capitalised, less accumulated realised losses not previously written off." },
    { q: "What extra test applies to a public company's distribution?", a: "After the distribution, net assets must be no less than called-up share capital plus undistributable reserves." },
    { q: "Can a revaluation surplus fund a dividend?", a: "No. It is unrealised and an undistributable reserve, and it is one of the reserves the public company test protects." },
    { q: "Who can be made to make good an unlawful distribution?", a: "A member who knew or had reasonable grounds to believe it was unlawful must repay it, and the directors who authorised it may be liable to the company." },
  ],
  furtherStudy: [
    "Chapter 26 covers the directors' duties an unlawful distribution breaches.",
    "Chapter 29 shows what the maintained capital is actually for.",
  ],
}

/* ── Chapter 25 · F1(a), F1(b) ─────────────────────────────────── */

export const LWG_TREE_25: StudyChapter = {
  id: "LWG-25",
  number: 25,
  paper: "LW",
  area: "F",
  title: "Directors: types, appointment, removal and disqualification",
  minutes: 15,
  syllabusRefs: ["F1(a)", "F1(b)"],
  intro:
    "A company acts through its directors, and the law is more interested in what someone actually does than in what they are called — which is why a person never formally appointed can still be a director.",
  outcomes: [
    "Explain the role of directors and distinguish the different types",
    "Explain the appointment of directors",
    "Explain the ways in which a director may lose office",
    "Explain the disqualification of directors and its consequences",
  ],
  sections: [
    {
      id: "types",
      heading: "The types of director",
      blocks: [
        {
          kind: "table",
          caption: "Substance over title",
          head: ["Type", "Who they are"],
          rows: [
            ["**De jure** director", "Validly **appointed** and registered as such"],
            ["**De facto** director", "Someone who **acts as a director** without valid appointment — treated as one, with the same duties and exposure"],
            ["**Shadow** director", "A person on whose **directions or instructions** the board is accustomed to act, without themselves appearing as a director. Professional advisers acting in that capacity are excluded"],
            ["**Executive** director", "A director who is also an **employee** with a management role — a finance or operations director"],
            ["**Non-executive** director", "A director without an executive role, bringing independent judgement and oversight"],
            ["**Managing director / chief executive**", "An executive to whom the board has delegated general management, and who accordingly has wide **usual** authority"],
            ["**Alternate** director", "A person appointed by a director, where the articles allow, to act in their absence"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why de facto and shadow directors matter",
          md: "Both carry the **duties and the liabilities** of a director — including exposure to disqualification and to wrongful trading. So a majority shareholder who runs the company from behind a compliant board cannot escape by never being appointed. When a scenario stresses that someone \"was not a director but the board always did what he said\", it is inviting a **shadow director** analysis.",
        },
      ],
      check: {
        q: "A dominant shareholder is not appointed a director, but the board has for years done whatever she instructs. What is her status?",
        options: [
          "She has no directors' duties, being unappointed",
          "She is likely a shadow director, carrying the duties and liabilities of a director",
          "She is an alternate director",
          "She is a non-executive director",
        ],
        correct: 1,
        explain:
          "A SHADOW DIRECTOR — a person on whose directions or instructions the board is accustomed to act. She carries the duties and the exposure of a director, including to disqualification and wrongful trading. Non-appointment is not an escape.",
      },
    },
    {
      id: "appointment-and-loss",
      heading: "Appointment, and losing office",
      blocks: [
        {
          kind: "list",
          title: "Appointment",
          items: [
            "The **first** directors are named on the application to register the company.",
            "Afterwards, appointment is as the **articles** provide — usually by ordinary resolution of the members, or by the **board** filling a casual vacancy.",
            "A **minimum number** is required, and the scenario will state it; public companies typically need more than private ones.",
            "**Particulars must be filed** with the registrar and entered in the register of directors, and there is normally a **minimum age**.",
            "**No shareholding qualification** is needed unless the articles impose one — a director need not be a member.",
          ],
        },
        {
          kind: "table",
          caption: "How a director leaves office",
          head: ["Route", "Detail"],
          rows: [
            ["**Resignation**", "By notice in accordance with the articles"],
            ["**Retirement by rotation**", "Where the articles so provide, a proportion retire and may offer themselves for re-election"],
            ["**Removal by the members**", "By **ordinary resolution**, on **special notice** to the company — and this power cannot be excluded by the articles or by a contract with the director"],
            ["**Vacation of office** under the articles", "On events such as bankruptcy, prolonged absence from meetings, or incapacity"],
            ["**Disqualification**", "By court order, or automatically in some circumstances"],
            ["**Death**, or the company's dissolution", "Office ends"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The removal power cannot be taken away — but it can be expensive",
          md: "Members may remove a director by **ordinary resolution** with special notice, whatever the articles or the director's service contract say. But removal from **office** does not cancel the **contract**: a director removed in breach of a service agreement may sue for **damages for wrongful dismissal**, and a long fixed term makes that costly. And where the articles give a director-shareholder **weighted votes** on a removal resolution, the removal may in practice be impossible to carry.",
        },
        {
          kind: "list",
          style: "number",
          title: "Disqualification",
          items: [
            "**Grounds** include conviction of an indictable offence connected with company management; persistent breach of filing obligations; **fraudulent or wrongful trading**; being found, in the words of the disqualification legislation, \"unfit to be concerned in the management of a company\", typically after insolvency; and breach of competition law.",
            "**Effect.** The person may not, for the period of the order, be a director or take part directly or indirectly in the **promotion, formation or management** of a company without leave of the court.",
            "**Duration** runs up to a statutory maximum, and the scenario will state the applicable range.",
            "**Acting in breach** is an offence and exposes the person to **personal liability** for the debts of the company incurred while doing so.",
            "**Undertakings.** Many systems allow a disqualification undertaking to be given without a court hearing, with the same effect as an order.",
          ],
        },
        {
          kind: "example",
          title: "Working a removal and disqualification problem",
          scenario:
            "Ferrers Ltd has four directors. Its articles provide that a director may be removed only by special resolution, and that on any resolution to remove him, Nash — a director holding 30% of the shares — shall have four votes per share. Nash's conduct has become erratic and the other members, holding 70%, wish to remove him. Nash has a five-year service contract with three years to run at $180,000 a year. Separately, Nash was a director of a company that entered insolvent liquidation last year, having continued to trade and incur credit for eight months after it was plainly insolvent.",
          steps: [
            { label: "Test the special resolution requirement in the articles", detail: "INVALID as a restriction. The members' power to remove a director by ORDINARY resolution on special notice cannot be excluded by the articles, so the requirement for a special resolution does not bind them." },
            { label: "Test the weighted voting provision", detail: "This is harder. Weighted votes on a removal resolution can make the statutory power practically unusable. On 30% of the shares with four votes each, Nash may command more votes than the other 70% combined, so the resolution may FAIL in practice even though it is legally available." },
            { label: "Compute the voting position", detail: "If there are 100 shares, Nash has 30 shares × 4 votes = 120 votes; the others have 70 votes. Nash defeats the resolution. The members' remedy then lies elsewhere — an unfair prejudice petition, or altering the articles if they can muster the majority to do so." },
            { label: "Deal with the service contract", detail: "Even if removal succeeds, Nash's CONTRACT is a separate matter. Removal in breach of a three-year unexpired term exposes the company to DAMAGES for wrongful dismissal — potentially a substantial sum against $540,000 of remaining salary, subject to mitigation." },
            { label: "Turn to the disqualification exposure", detail: "Continuing to trade and incur credit for eight months after insolvency was plain is the classic WRONGFUL TRADING pattern, and a ground for a finding, in the words of s.6 of the disqualification legislation, that Nash is \"unfit to be concerned in the management of a company\"." },
            { label: "State the consequence of disqualification", detail: "If disqualified, Nash may not be a director or take part directly or indirectly in the promotion, formation or management of a company for the period of the order — which would end the Ferrers problem, and acting in breach would make him personally liable for debts incurred." },
          ],
          result:
            "The articles cannot require a special resolution, but the **weighted votes may still defeat the removal in practice** — and even a successful removal leaves a damages claim on the service contract. The disqualification route may achieve what the members' vote cannot. The point to carry away is the difference between a restriction that is **void** and one that is **effective though indirect**.",
        },
      ],
      check: {
        q: "A company's articles state that a director may be removed only by special resolution. Is that effective?",
        options: [
          "Yes, the articles govern removal",
          "No — the members may remove a director by ordinary resolution on special notice, and that power cannot be excluded",
          "Yes, if the director consented to the article",
          "Only for a public company",
        ],
        correct: 1,
        explain:
          "NOT EFFECTIVE. The statutory power to remove by ORDINARY resolution with special notice cannot be excluded by the articles or by contract. Note, though, that a WEIGHTED VOTING provision may still frustrate removal in practice without being a direct exclusion.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating an unappointed person as free of directors' duties.",
      fix: "A DE FACTO or SHADOW director carries the same duties and liabilities, including exposure to disqualification and wrongful trading.",
    },
    {
      trap: "Letting the articles require more than an ordinary resolution to remove a director.",
      fix: "The removal power cannot be excluded by the articles or by contract. Weighted votes, however, may frustrate it indirectly.",
    },
    {
      trap: "Assuming removal from office ends the service contract.",
      fix: "It does not. A director removed in breach may claim damages for wrongful dismissal.",
    },
    {
      trap: "Requiring a director to hold shares.",
      fix: "No shareholding qualification is needed unless the articles impose one.",
    },
    {
      trap: "Reading disqualification as barring only formal directorship.",
      fix: "It bars taking part directly OR INDIRECTLY in promotion, formation or management, and breach brings personal liability for debts incurred.",
    },
  ],
  keyTerms: [
    { term: "De facto director", def: "A person who acts as a director without valid appointment, carrying a director's duties and liabilities." },
    { term: "Shadow director", def: "A person on whose directions or instructions the board is accustomed to act, excluding advisers acting professionally." },
    { term: "Non-executive director", def: "A director without an executive management role, providing independent judgement and oversight." },
    { term: "Removal by ordinary resolution", def: "The members' power to remove a director on special notice, which cannot be excluded by the articles or by contract." },
    { term: "Disqualification", def: "A court order or undertaking barring a person from acting as a director or taking part in the promotion, formation or management of a company." },
  ],
  summary: [
    "The law classifies directors by what they do: de jure, de facto and shadow directors all carry a director's duties.",
    "Executive and non-executive directors differ in role, not in duty; a managing director has wide usual authority.",
    "First directors are named on registration; later appointments follow the articles, with particulars filed.",
    "No shareholding qualification is required unless the articles impose one.",
    "Members may remove a director by ordinary resolution on special notice, and that power cannot be excluded.",
    "Removal does not cancel the service contract, so damages for wrongful dismissal may follow.",
    "Disqualification bars direct or indirect participation in management, and acting in breach brings personal liability.",
  ],
  knowledgeDiagnostic: [
    { q: "What is a shadow director?", a: "A person on whose directions or instructions the board is accustomed to act, without appearing as a director — carrying a director's duties and liabilities." },
    { q: "Can the articles require a special resolution to remove a director?", a: "No. The members' power to remove by ordinary resolution on special notice cannot be excluded, though weighted voting may frustrate it in practice." },
    { q: "Does removal from office end the director's service contract?", a: "No. Removal in breach of the contract exposes the company to damages for wrongful dismissal." },
    { q: "Name three grounds for disqualification.", a: "Conviction of an indictable offence connected with company management, persistent breach of filing obligations, and fraudulent or wrongful trading. A finding of unfitness after insolvency is another." },
    { q: "What does a disqualification order prohibit?", a: "Acting as a director or taking part directly or indirectly in the promotion, formation or management of a company without leave of the court." },
  ],
  furtherStudy: [
    "Chapter 26 sets out the duties these directors owe.",
    "Chapter 33 covers the fraudulent and wrongful trading that leads to disqualification.",
  ],
}

/* ── Chapter 26 · F1(c), F1(d) ─────────────────────────────────── */

export const LWG_TREE_26: StudyChapter = {
  id: "LWG-26",
  number: 26,
  paper: "LW",
  area: "F",
  title: "Directors' powers and duties",
  minutes: 17,
  syllabusRefs: ["F1(c)", "F1(d)"],
  intro:
    "The board's power to manage is nearly unlimited, and that is precisely why the duties are strict. Almost every question here is about a director who had the power to do something and should not have used it.",
  outcomes: [
    "Separate what the board, a managing director and a single director can each commit the company to",
    "Explain the duties directors owe to their companies",
    "Explain the statutory controls over dealings between directors and their companies, including loans",
    "Apply the duties to decide whether a director has breached them and what follows",
  ],
  sections: [
    {
      id: "powers",
      heading: "Who can bind the company",
      blocks: [
        {
          kind: "table",
          caption: "Three different capacities",
          head: ["Who", "Power to bind the company"],
          rows: [
            ["**The board collectively**", "A **general power to manage**, exercised by decision of the board. This is where the power resides"],
            ["**The managing director / chief executive**", "Wide **usual** authority flowing from the position, plus whatever the board has expressly delegated"],
            ["**An individual director**", "**No** general power to bind the company merely by being a director. Authority must be express, implied, usual or apparent"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "An individual director is not the company",
          md: "This is the most commonly assumed error in the area. A single director, acting alone and without delegated authority, has **no** inherent power to commit the company. Whether the company is bound is an **agency** question (chapter 17): was there actual authority, or did the company hold the director out? Being on the board is not itself a holding out that a director may sign anything.",
        },
        {
          kind: "list",
          title: "Protection for a third party",
          items: [
            "**A person dealing with the company in good faith** is generally not affected by limits on the directors' powers under the constitution — they need not investigate the articles.",
            "**Good faith is presumed** and is not lost merely by knowing that the act exceeds the constitutional limit in some systems; but a party who is **party to the breach**, or acting dishonestly, is unprotected.",
            "**Internal irregularity does not invalidate** the transaction as against a good-faith outsider — the remedy is against the directors.",
          ],
        },
      ],
      check: {
        q: "A single director, with no delegated authority, signs a major contract in the company's name. Is the company bound?",
        options: [
          "Yes — every director can bind the company",
          "Not automatically; it depends on whether the director had actual authority or the company held them out as having it",
          "Yes, if the contract benefits the company",
          "No, in every case",
        ],
        correct: 1,
        explain:
          "NOT AUTOMATICALLY. Power to manage resides in the BOARD; an individual director has no inherent authority. Whether the company is bound is an agency question — actual authority, or a holding out by the company. Benefit to the company is irrelevant to whether authority existed.",
      },
    },
    {
      id: "duties",
      heading: "The duties",
      blocks: [
        {
          kind: "table",
          caption: "The general duties, and what each catches",
          head: ["Duty", "What it requires", "Typical breach"],
          rows: [
            ["**Act within powers**", "Act in accordance with the constitution and exercise powers only for the purposes for which they are conferred", "Issuing shares to defeat a takeover rather than to raise capital"],
            ["**Promote the success of the company**", "Act in the way the director considers, in good faith, most likely to promote the company's success for the benefit of its members, having regard to the longer term, employees, suppliers, customers, the community, the environment and the company's reputation", "Favouring one shareholder's interests, or a parent's, over the company's"],
            ["**Exercise independent judgement**", "Not fetter discretion by agreeing in advance to vote as another directs", "Signing a contract binding the board's future votes"],
            ["**Exercise reasonable care, skill and diligence**", "**s.174(2)** — \"the care of a reasonably diligent person with the general knowledge, skill and experience\" reasonably expected of someone in that role, **and** with the director's own actual knowledge, skill and experience", "Not reading the accounts; leaving everything to a colleague"],
            ["**Avoid conflicts of interest**", "Avoid a situation in which the director has, or may have, an interest conflicting with the company's — including exploitation of property, information or opportunity", "Taking for oneself a contract the company was pursuing"],
            ["**Not accept benefits from third parties**", "Not accept a benefit conferred by reason of being a director or of doing anything as one", "A supplier's commission"],
            ["**Declare an interest** in a proposed or existing transaction", "Declare the nature and extent of the interest to the other directors before the company enters the transaction", "Voting on a contract with one's own other business without disclosure"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The care and skill test has two limbs, and the second is personal",
          md: "The standard is **objective** — what would be expected of anyone in that role — **and subjective**, raised by the director's **own** actual knowledge, skill and experience. So a qualified accountant serving as finance director is held to a **higher** standard than a lay director, and cannot plead the objective minimum. The subjective limb can only **raise** the standard, never lower it.",
        },
        {
          kind: "list",
          title: "Consequences of breach, and relief",
          items: [
            "**Remedies** to the company: damages or compensation; **restoration** of company property; **account** for profits; **rescission** of a tainted contract; and an **injunction** to prevent a threatened breach.",
            "**Ratification** by the members is possible for some breaches, with the votes of the interested director and their connected persons **disregarded** — but a breach cannot be ratified where it would amount to a fraud on the minority or the company is insolvent.",
            "**The duties are owed to the company**, so it is the company that sues; a member can only do so through a **derivative claim** with permission.",
            "**Relief from liability.** The court may relieve a director who acted **honestly and reasonably**, and a company may indemnify or insure a director within limits — but it cannot exempt them from liability outright.",
          ],
        },
        {
          kind: "example",
          title: "Working a duties problem",
          scenario:
            "Danforth is a director of Wrenbury Ltd and a qualified engineer. Wrenbury has been negotiating for months to acquire a licence to a patented process; Danforth conducts the negotiations. Learning that the licensor would grant it cheaply, he takes the licence **personally** through a company he owns, and then offers to sub-licence it to Wrenbury at a mark-up. He does not mention his interest at the board meeting that approves the sub-licence, at which he votes in favour. Wrenbury also lends Danforth $120,000 to buy the shares in his company, approved by the board alone. The engineering specification Danforth signed off on a separate project proves negligently drawn, causing $200,000 of loss.",
          steps: [
            { label: "The licence: conflict and corporate opportunity", detail: "Danforth took for himself an OPPORTUNITY the company was actively pursuing, using information gained as a director. That breaches the duty to AVOID CONFLICTS and to act within powers, and he must ACCOUNT for the profit — the mark-up belongs to Wrenbury." },
            { label: "The undisclosed interest and the vote", detail: "He failed to DECLARE the nature and extent of his interest before Wrenbury entered the sub-licence, and voted on it. The transaction is liable to be RESCINDED, and his vote should have been disregarded." },
            { label: "The loan", detail: "A loan to a DIRECTOR is a controlled transaction: it ordinarily requires MEMBERS' approval, not merely the board's. Approval by the board alone is likely to make it improper, and the loan is repayable with the directors who authorised it exposed." },
            { label: "The negligent specification: which standard?", detail: "The care and skill duty is objective AND subjective. Danforth is a QUALIFIED ENGINEER, so he is judged by the higher standard his own qualification imports — he cannot plead what a lay director would have known." },
            { label: "Identify Wrenbury's remedies", detail: "Account for the licence profit; rescission of the sub-licence; repayment of the loan; and compensation for the $200,000 negligence loss. An injunction would have been available had the licence been threatened rather than taken." },
            { label: "Consider ratification", detail: "The members might ratify some breaches, but Danforth's and his connected persons' votes are DISREGARDED — and if Wrenbury is insolvent or the ratification would be a fraud on the minority, it cannot be ratified at all." },
          ],
          result:
            "Breaches of four duties, with account, rescission, repayment and compensation all in play. Two points do the most work: a **corporate opportunity belongs to the company** even if the company might not have obtained it, and the **subjective limb of the care duty raises the standard** for a professionally qualified director rather than leaving it at the general minimum.",
        },
      ],
      check: {
        q: "A director who is a qualified accountant fails to notice an obvious error in the accounts. What standard of care applies?",
        options: [
          "The general standard expected of any director, since duties are uniform",
          "The higher standard imported by their own actual knowledge, skill and experience, in addition to the objective minimum",
          "A lower standard, because reliance on management is reasonable",
          "No standard, as accounts are the auditor's responsibility",
        ],
        correct: 1,
        explain:
          "The HIGHER standard. The care and skill duty is objective — what is expected of anyone in the role — AND subjective, raised by the director's own knowledge, skill and experience. A qualified accountant cannot plead the general minimum, and the auditor's role does not displace the director's.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Assuming any single director can bind the company.",
      fix: "Power resides in the BOARD. For an individual director it is an agency question — actual or apparent authority.",
    },
    {
      trap: "Applying only the objective limb of the care and skill duty.",
      fix: "The director's own knowledge, skill and experience RAISE the standard. It never lowers it.",
    },
    {
      trap: "Allowing a director to keep a corporate opportunity because the company might not have obtained it.",
      fix: "The opportunity belongs to the company; the director must account for the profit regardless.",
    },
    {
      trap: "Letting the board alone approve a loan to a director.",
      fix: "Dealings between a director and the company are controlled, and a loan ordinarily needs MEMBERS' approval.",
    },
    {
      trap: "Counting the interested director's votes in a ratification.",
      fix: "The votes of the director and their connected persons are disregarded — and some breaches cannot be ratified at all.",
    },
    {
      trap: "Saying a member can sue for breach of a director's duty.",
      fix: "The duties are owed to the COMPANY. A member needs a derivative claim, with permission.",
    },
  ],
  keyTerms: [
    { term: "Duty to act within powers", def: "The duty to act in accordance with the constitution and to exercise powers only for their proper purpose." },
    { term: "Duty to promote the success of the company", def: "The duty to act as the director considers in good faith most likely to promote the company's success for the members, having regard to the wider factors." },
    { term: "Duty of care, skill and diligence", def: "An objective standard for the role, raised by the director's own actual knowledge, skill and experience." },
    { term: "Duty to avoid conflicts", def: "The duty to avoid situations of actual or possible conflict, including exploiting company property, information or opportunity." },
    { term: "Declaration of interest", def: "The requirement to declare the nature and extent of an interest in a proposed transaction before the company enters it." },
    { term: "Derivative claim", def: "A claim brought by a member on the company's behalf for a wrong done to the company, requiring the court's permission." },
  ],
  summary: [
    "Power to manage resides in the board; an individual director has no inherent power to bind the company.",
    "A good-faith third party is generally unaffected by constitutional limits on the directors' powers.",
    "The duties are: act within powers, promote success, exercise independent judgement and reasonable care, avoid conflicts, refuse third-party benefits, and declare interests.",
    "The care and skill standard is objective and is raised by the director's own knowledge and experience.",
    "A corporate opportunity belongs to the company, and the director must account for any profit.",
    "Dealings between a director and the company, including loans, are controlled and usually need members' approval.",
    "The duties are owed to the company, and remedies include account, rescission, restoration, compensation and injunction.",
  ],
  knowledgeDiagnostic: [
    { q: "Where does the power to manage the company reside?", a: "In the board collectively. A managing director has wide usual authority, but an individual director has no inherent power to bind the company." },
    { q: "State both limbs of the care and skill duty.", a: "The objective standard of a reasonably diligent person in that role, and the subjective standard imported by the director's own actual knowledge, skill and experience — which can only raise it." },
    { q: "Can a director keep a profit from an opportunity the company might not have won?", a: "No. The opportunity belongs to the company and the director must account for the profit." },
    { q: "Whose approval does a loan to a director normally require?", a: "The members', not merely the board's. Dealings between a director and the company are statutorily controlled." },
    { q: "Whose votes are disregarded when members ratify a director's breach?", a: "Those of the director concerned and their connected persons — and some breaches cannot be ratified at all." },
  ],
  furtherStudy: [
    "Chapter 27 covers the other officers who support and check the board.",
    "Chapter 33 covers the point at which a breach of duty becomes fraudulent or wrongful trading.",
  ],
}

/** Chapters 23–26. Chapters 27–28 complete Area F in acca-study-lwg-tree-fgh.ts. */
export const LWG_TREE_AREA_E_PART2: StudyChapter[] = [LWG_TREE_23, LWG_TREE_24]
export const LWG_TREE_AREA_F_PART1: StudyChapter[] = [LWG_TREE_25, LWG_TREE_26]
