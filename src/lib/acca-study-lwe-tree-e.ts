import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area E — capital and financing of companies.
 * Chapters 34–36 of the LW-ENG reading tree, mapped to syllabus groups E1–E3.
 *
 * Forked from the Global tree and specialised to the Companies Act 2006. This is the
 * area where the Global hedging cost the most: capital maintenance and dividend law are
 * a set of specific statutory tests, and a Global chapter that says "apply the rule the
 * scenario supplies" cannot teach the ONE thing that decides these questions — that a
 * public company faces an ADDITIONAL net-assets test which frequently bites before the
 * distributable profits test does.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named.
 */

/* ── Chapter 34 · E1 ───────────────────────────────────────────── */

export const LWE_TREE_34: StudyChapter = {
  id: "LWE-34",
  number: 34,
  paper: "LW",
  area: "E",
  title: "Share capital, classes of shares and issues",
  minutes: 17,
  syllabusRefs: ["E1(a)", "E1(b)", "E1(c)", "E1(d)"],
  intro:
    "Equity finance, and the vocabulary that goes with it. The marks are in the distinctions — between the kinds of capital, between classes of share, and between the two quite different ways of issuing more.",
  outcomes: [
    "Distinguish the different types of capital",
    "Distinguish the classes of shares, including treasury shares, and vary class rights properly",
    "Explain allotment, and distinguish a rights issue from a bonus issue",
    "Explain the effect of issuing at a premium, and why issuing at a discount is prohibited",
    "Apply the class rights variation procedure to given facts",
  ],
  sections: [
    {
      id: "capital-and-classes",
      heading: "The types of capital, and the classes of share",
      blocks: [
        {
          kind: "table",
          caption: "The types of capital",
          head: ["Term", "What it means"],
          rows: [
            ["**Issued (allotted) share capital**", "The nominal value of the shares actually **issued** to members"],
            ["**Called-up share capital**", "The amount the company has **required** members to pay on their shares"],
            ["**Paid-up share capital**", "The amount members have **actually paid**"],
            ["**Share premium**", "Anything received **above the nominal value**, which must go to a **share premium account** and is an **undistributable reserve**"],
            ["**Loan capital**", "Borrowed money — debentures and other debt. Not share capital at all (chapter 35)"],
            ["**Reserve capital**", "Capital an unlimited company or one with uncalled capital has resolved shall be called up only on winding up"],
          ],
        },
        {
          kind: "table",
          caption: "The classes of share",
          head: ["Class", "Its characteristics"],
          rows: [
            ["**Ordinary shares**", "The **residual** class: dividends at the directors' discretion out of distributable profits, full voting rights, and last in line on a winding up. Carries the risk and the upside"],
            ["**Preference shares**", "A **fixed dividend** paid **before** ordinary dividends, and priority on a winding up for capital. Usually **no vote** except where their rights are affected or the dividend is in arrears. Presumed **cumulative** unless stated otherwise, so an unpaid dividend carries forward"],
            ["**Redeemable shares**", "Issued on terms that they will or may be **bought back** by the company. A company may not have redeemable shares alone"],
            ["**Treasury shares**", "Shares the company has **bought back and holds itself** rather than cancelling. While held, they carry **no votes and no dividends**, and they may later be sold, transferred to an employees' scheme, or cancelled"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Preference shares are presumed cumulative — and mostly non-voting",
          md: "Two default rules that decide questions. A preference dividend is presumed **cumulative**, so if it is not paid in one year the arrears carry forward and must be met before any ordinary dividend — the arrears do **not** simply disappear. And preference shares normally carry **no vote**, which is what makes them attractive to a company wanting capital without diluting control; but they typically **acquire** a vote where their class rights are being varied or where the dividend is in arrears. A scenario that has a preference dividend unpaid for two years is signalling both points.",
        },
        {
          kind: "definition",
          term: "Varying class rights",
          md: "Class rights may be varied only in accordance with any **procedure in the articles**, and otherwise with the **written consent of holders of at least three-quarters in nominal value** of the class, or a **special resolution passed at a separate class meeting**. Holders of **not less than 15%** of the class who did **not** consent may then apply to the **court** to have the variation cancelled, within **21 days**, and the variation does not take effect until the application is disposed of.",
        },
      ],
      check: {
        q: "A company holds shares it has bought back as treasury shares. What rights attach to them while held?",
        options: [
          "Full voting and dividend rights, exercised by the directors",
          "None — treasury shares carry no votes and no dividends while the company holds them",
          "Voting rights only",
          "Dividend rights only, which increase the distributable profits",
        ],
        correct: 1,
        explain:
          "NONE. While the company holds its own shares in treasury they carry NO VOTES and NO DIVIDENDS — a company cannot be a member of itself in any meaningful sense. They may later be SOLD, transferred to an employees' share scheme, or CANCELLED.",
      },
    },
    {
      id: "issues",
      heading: "Allotment, rights issues and bonus issues",
      blocks: [
        {
          kind: "list",
          title: "Allotment",
          items: [
            "The **directors** allot shares, needing authority from the articles or an ordinary resolution — though the directors of a **private company with one class of share** may generally allot without further authority unless the articles restrict it.",
            "**Pre-emption rights** apply: new **equity securities** must generally be offered to existing shareholders **in proportion to their holdings** first, so their percentage is not diluted without their consent.",
            "Pre-emption rights may be **disapplied** by special resolution, or excluded by the articles of a private company.",
            "The allotment must be **registered** in the register of members and a **return of allotment** filed with the registrar.",
            "Shares must **not** be allotted at a **discount** to nominal value.",
          ],
        },
        {
          kind: "table",
          caption: "Rights issue against bonus issue",
          head: ["", "Rights issue", "Bonus (capitalisation) issue"],
          rows: [
            ["**What happens**", "Existing members are offered **new shares for cash**, pro rata to their holdings, usually at a **discount to market price**", "Existing members receive **free** shares, pro rata, paid up out of **reserves**"],
            ["**Cash into the company**", "**Yes** — it raises finance", "**None** — no money comes in"],
            ["**Effect on reserves**", "Increases share capital, and share premium if issued above nominal value", "**Capitalises** reserves: reserves fall and share capital rises by the same amount"],
            ["**Effect on the member**", "Must **pay** to maintain their percentage; can sell the rights instead", "Nothing to pay; percentage unchanged"],
            ["**Purpose**", "**Raising capital**", "Adjusting the capital structure — often to make shares more marketable, and to signal confidence"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "A bonus issue raises nothing, and that is the examinable point",
          md: "The commonest error is treating a bonus issue as a way of raising finance. **No cash comes in.** It moves an amount from **reserves** to **share capital**, so the company's net assets are unchanged and the shareholders are collectively no richer — each simply holds more shares in the same company. It also **reduces** distributable reserves, since capitalised profits can no longer be paid out as dividends, which links straight into chapter 36. A **rights issue**, by contrast, genuinely raises money.",
        },
        {
          kind: "table",
          caption: "Premium and discount",
          head: ["", "Position"],
          rows: [
            ["**Issue at a premium**", "**Permitted.** The excess over nominal value goes to the **share premium account**, an undistributable reserve that may be used only for limited purposes such as writing off certain issue expenses"],
            ["**Issue at a discount**", "**Prohibited.** Shares may not be allotted below nominal value. An allottee who takes shares at a discount is liable to pay the **shortfall** plus interest — the rule exists to protect creditors, who rely on the stated capital"],
          ],
        },
        {
          kind: "example",
          title: "Working an issue and a class variation",
          scenario:
            "Netherby plc has 400,000 ordinary £1 shares and 100,000 8% cumulative preference £1 shares. No preference dividend has been paid for two years. The board proposes: (i) a 1-for-4 bonus issue to ordinary shareholders, capitalising £100,000 of retained earnings; (ii) an allotment of 200,000 new ordinary shares at £1.60 to a single institutional investor, without offering them to existing members; and (iii) a resolution reducing the preference dividend from 8% to 5%, to be passed by the ordinary shareholders alone. Holders of 20% of the preference shares object.",
          steps: [
            { label: "Analyse the bonus issue", detail: "It raises NO CASH. £100,000 moves from RETAINED EARNINGS to SHARE CAPITAL, so net assets are unchanged and the ordinary holders are no richer — each just holds more shares. Its real effect is to REDUCE distributable reserves by £100,000, which restricts future dividends (chapter 36)." },
            { label: "Test the allotment for pre-emption", detail: "New EQUITY SECURITIES must first be offered to existing shareholders PRO RATA. Allotting 200,000 shares to one institution without doing so breaches pre-emption rights unless they have been DISAPPLIED BY SPECIAL RESOLUTION. As a plc, Netherby cannot simply exclude them by its articles." },
            { label: "Analyse the premium", detail: "£1.60 for a £1 share is a PREMIUM, which is permitted. £1 per share goes to share capital and 60p to the SHARE PREMIUM ACCOUNT, an UNDISTRIBUTABLE reserve — so it raises £320,000 of cash but only £200,000 of it is ever distributable." },
            { label: "Test the preference dividend reduction", detail: "Reducing the rate VARIES CLASS RIGHTS. It CANNOT be done by the ordinary shareholders alone: it needs the procedure in the articles, or the written consent of 75% in nominal value of the PREFERENCE class, or a special resolution at a SEPARATE CLASS MEETING." },
            { label: "Note the preference holders' position", detail: "Because their rights are being varied — and because the dividend is TWO YEARS IN ARREARS — the preference shares will typically CARRY A VOTE here, despite normally being non-voting. And being CUMULATIVE, the two years' arrears must be paid before any ordinary dividend." },
            { label: "Apply the minority protection", detail: "The objectors hold 20% of the class, which exceeds the 15% threshold, so if the variation is passed they may apply to the COURT within 21 DAYS to have it cancelled, and it does not take effect until that application is disposed of." },
          ],
          result:
            "The bonus issue is lawful but **raises nothing and shrinks distributable reserves**; the allotment needs **pre-emption disapplied**; and the dividend reduction needs **class consent**, cannot be done by the ordinaries, and is exposed to a **15% application to the court**. The two years of arrears both **must be paid first** and **give the preference holders a vote**.",
        },
      ],
      check: {
        q: "A company makes a 1-for-5 bonus issue capitalising £50,000 of reserves. What is the effect?",
        options: [
          "It raises £50,000 of new capital for the company",
          "No cash comes in — reserves fall and share capital rises by £50,000, reducing distributable reserves",
          "Members must each pay for their new shares pro rata",
          "It has no effect on the company's accounts at all",
        ],
        correct: 1,
        explain:
          "NO CASH comes in. A bonus issue CAPITALISES reserves: £50,000 moves from reserves to SHARE CAPITAL, leaving net assets unchanged while REDUCING the distributable reserves available for future dividends. A RIGHTS issue is the one that raises money, because members pay for the new shares.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating a bonus issue as raising finance.",
      fix: "No cash comes in. It capitalises reserves and reduces distributable profits.",
    },
    {
      trap: "Assuming a preference dividend not paid is simply lost.",
      fix: "Preference dividends are presumed CUMULATIVE, so arrears carry forward and rank before any ordinary dividend.",
    },
    {
      trap: "Letting ordinary shareholders vary another class's rights.",
      fix: "Class rights need the articles' procedure, or 75% of that class in writing, or a special resolution at a separate class meeting.",
    },
    {
      trap: "Ignoring pre-emption rights on a new allotment.",
      fix: "New equity securities must be offered pro rata to existing members unless pre-emption is disapplied by special resolution.",
    },
    {
      trap: "Treating share premium as distributable.",
      fix: "It is an undistributable reserve usable only for limited purposes.",
    },
  ],
  keyTerms: [
    { term: "Called-up capital", def: "The amount the company has required members to pay on their shares." },
    { term: "Share premium account", def: "The undistributable reserve holding amounts received above nominal value." },
    { term: "Preference share", def: "A share with a fixed dividend paid before ordinary dividends, presumed cumulative and usually non-voting." },
    { term: "Treasury shares", def: "The company's own shares bought back and held by it, carrying no votes or dividends." },
    { term: "Pre-emption rights", def: "The right of existing members to be offered new equity securities pro rata before others." },
    { term: "Rights issue", def: "An offer of new shares for cash to existing members pro rata, which raises finance." },
    { term: "Bonus issue", def: "A free issue paid out of reserves, which raises no cash and capitalises reserves." },
  ],
  summary: [
    "Issued, called-up and paid-up capital are distinct, and share premium is an undistributable reserve.",
    "Preference shares carry a fixed, presumed cumulative dividend and usually no vote except when rights are varied or dividends are in arrears.",
    "Treasury shares carry no votes or dividends while held.",
    "A rights issue raises cash; a bonus issue capitalises reserves and raises nothing.",
    "Class rights need 75% of the class or a separate class meeting, with a 15% minority able to apply to the court within 21 days.",
  ],
  knowledgeDiagnostic: [
    { q: "Distinguish a rights issue from a bonus issue.", a: "A rights issue offers new shares for cash pro rata and raises finance; a bonus issue gives free shares out of reserves, raises no cash, and reduces distributable reserves." },
    { q: "How are class rights varied?", a: "By the procedure in the articles, or the written consent of 75% in nominal value of the class, or a special resolution at a separate class meeting." },
    { q: "What protection has a dissenting minority of a class?", a: "Holders of not less than 15% who did not consent may apply to the court within 21 days to cancel the variation, which does not take effect until the application is disposed of." },
    { q: "Why may shares not be issued at a discount?", a: "To protect creditors, who rely on the stated capital; an allottee taking shares at a discount must pay the shortfall with interest." },
  ],
}

/* ── Chapter 35 · E2 ───────────────────────────────────────────── */

export const LWE_TREE_35: StudyChapter = {
  id: "LWE-35",
  number: 35,
  paper: "LW",
  area: "E",
  title: "Loan capital, debentures and charges",
  minutes: 16,
  syllabusRefs: ["E2(a)", "E2(b)", "E2(c)", "E2(d)", "E2(e)"],
  intro:
    "Borrowing instead of issuing shares changes who bears the risk, who has a vote, and — decisively, if things go wrong — who gets paid first.",
  outcomes: [
    "Define a company's borrowing powers",
    "Explain loan capital and the meaning of a debenture",
    "Compare the rights of shareholders and debenture holders",
    "Distinguish fixed from floating charges and explain crystallisation",
    "Explain the registration of charges and the consequence of failing to register",
  ],
  sections: [
    {
      id: "loan-capital",
      heading: "Borrowing powers, debentures, and debt against equity",
      blocks: [
        {
          kind: "definition",
          term: "Debenture",
          md: "A **document acknowledging a company's indebtedness**, whether or not secured on its assets. Loosely the loan itself; strictly the instrument. Debentures may be issued **singly** to one lender or as a **series** to many, may be **secured** by a charge or entirely **unsecured**, and may be **redeemable** or **irredeemable**.",
        },
        {
          kind: "list",
          title: "Borrowing powers",
          items: [
            "A company registered under CA 2006 has **unrestricted objects** unless its articles restrict them, so a trading company may borrow and give security.",
            "Any **restriction lives in the articles** and binds the directors **internally**.",
            "A **third party dealing in good faith** is generally **not affected** by a constitutional limit on the directors' powers — so borrowing beyond an internal limit is usually still enforceable by the lender, while exposing the directors to the company for breach of duty (chapter 38).",
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
            ["**Capital repayment**", "Only on winding up, or a permitted reduction or buy-back", "**On the redemption date**, as a contractual right"],
            ["**Security**", "None", "May hold a **fixed or floating charge**"],
            ["**Accounting treatment of the return**", "A **distribution**", "A **finance cost**, reducing profit"],
            ["**Purchase of own**", "Restricted by capital maintenance rules (chapter 36)", "A company may freely buy its own debentures"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Interest is payable whatever the results",
          md: "This is the commercial heart of the distinction. A dividend can simply be passed over in a bad year; **interest cannot**. So borrowing raises the fixed cost the company must meet before it earns anything for members, which is why gearing measures risk — and why a heavily geared company in a downturn ends up in chapter 41.",
        },
      ],
      check: {
        q: "A company has no distributable profits this year. What are the positions of its debenture holders and its ordinary shareholders?",
        options: [
          "Neither is entitled to any payment",
          "Debenture holders remain entitled to their interest; ordinary shareholders have no entitlement to a dividend",
          "Both must be paid out of capital",
          "Shareholders rank ahead of debenture holders in a loss-making year",
        ],
        correct: 1,
        explain:
          "INTEREST is a contractual debt payable whether or not there are profits. A DIVIDEND may only be paid out of distributable profits and is at the directors' discretion, so the ordinary shareholders get nothing. Shareholders never rank ahead of creditors.",
      },
    },
    {
      id: "charges",
      heading: "Fixed and floating charges, and registration",
      blocks: [
        {
          kind: "definition",
          term: "Company charge",
          md: "**Security** given by a company over its assets for a debt, entitling the holder to be paid out of those assets in priority to unsecured creditors. A **fixed** charge attaches to **specific, identified assets**; a **floating** charge hovers over a **class of assets** the company may continue to deal with in the ordinary course of business until the charge **crystallises**.",
        },
        {
          kind: "table",
          caption: "The comparison that decides these questions",
          head: ["", "Fixed charge", "Floating charge"],
          rows: [
            ["**What it covers**", "Specific identified assets — land, a named machine", "A **class** of assets, typically changing — inventory, receivables, or the whole undertaking"],
            ["**Dealing with the assets**", "The company **cannot** dispose of them free of the charge without consent", "The company **may** deal with them in the ordinary course until crystallisation"],
            ["**Priority**", "**Higher** — ranks ahead of a floating charge over the same assets, even one created earlier", "**Lower**, and subordinated to **preferential creditors** and to the **prescribed part** set aside for unsecured creditors"],
            ["**Crystallisation**", "Not applicable", "Converts into a **fixed** charge over the assets then in the class"],
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
            "An **event specified in the charge instrument** occurs, where the instrument provides for automatic crystallisation.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The floating charge holder's two weaknesses",
          md: "First, **priority**: a floating charge ranks behind a fixed charge over the same assets — **even a later one**, unless the instrument contains a negative pledge of which the later chargee had notice — and behind **preferential creditors**, and it must give up the **prescribed part** for unsecured creditors. Second, **the assets can disappear**: until crystallisation the company may sell the very inventory and receivables the charge covers. That is the price of letting the company trade, and it is why lenders take fixed charges wherever the asset allows.",
        },
        {
          kind: "list",
          title: "Registration of charges",
          items: [
            "A charge must be **registered with the registrar** within **21 days** of creation, and the company must also keep copies in its own **register of charges**.",
            "**Either the company or any interested person** may register, which in practice means the lender does it rather than trusting the borrower.",
            "The registrar issues a **certificate of registration**, which is **conclusive evidence** that the charge was registered.",
            "**Failure to register within 21 days makes the charge VOID against a liquidator, an administrator and any creditor** of the company — so the lender drops to **unsecured** and its security is worthless where it matters most.",
            "The **debt itself remains valid and immediately payable**, so the lender may still sue for it — it simply has no security.",
            "Registration puts the world on **notice** of the charge, which is what makes the priority rules workable.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Late registration destroys the security, not the debt",
          md: "The distinction is worth a mark on its own. An unregistered charge is **void as security** against liquidator, administrator and other creditors — the lender ranks as **unsecured**. But the **loan remains recoverable** as a debt, and indeed becomes immediately payable. So the answer to \"what is the effect of failing to register?\" is never \"the loan is void\"; it is \"the lender loses its priority and joins the unsecured queue\".",
        },
        {
          kind: "example",
          title: "Ranking the charges",
          scenario:
            "Cranfield Ltd grants: on 1 March, a floating charge over its whole undertaking to Bank A, containing a clause prohibiting the creation of any later fixed charge ranking ahead of it; on 10 March, a fixed charge over its factory to Bank B, which had read the register and knew of Bank A's clause; and on 20 March, a fixed charge over its delivery fleet to Bank C, which knew nothing of Bank A's charge because Bank A registered on 5 April. Cranfield goes into liquidation in June. Its assets are the factory, the fleet and £180,000 of inventory. There are preferential creditors and a large body of unsecured trade creditors.",
          steps: [
            { label: "Test Bank A's registration", detail: "Bank A created its charge on 1 MARCH but registered on 5 APRIL — more than 21 DAYS later. The charge is therefore VOID against the liquidator and the other creditors. Bank A drops to UNSECURED, though its loan remains a recoverable debt." },
            { label: "Bank B and the factory", detail: "A FIXED charge, properly created over identified property. Bank B knew of Bank A's negative pledge — but since Bank A's charge is void for late registration, the pledge is irrelevant. Bank B takes the FACTORY ahead of everyone." },
            { label: "Bank C and the fleet", detail: "Also a FIXED charge over identified assets, and Bank C had no notice of Bank A. It takes the FLEET. Even had Bank A registered in time, Bank C's fixed charge would rank AHEAD of the earlier floating charge, having no notice of the negative pledge." },
            { label: "The inventory", detail: "This is what a floating charge would have covered. With Bank A's charge void, the inventory is available to the liquidator: PREFERENTIAL creditors first, then the UNSECURED creditors — among whom Bank A now stands." },
            { label: "State the outcome", detail: "Bank B takes the factory, Bank C the fleet, and Bank A — whose charge was first in time and widest in scope — recovers only a dividend alongside the trade creditors, out of the inventory." },
            { label: "Identify the lesson", detail: "Bank A lost everything through a MISSED 21-DAY DEADLINE, and its negative pledge became worthless with the charge. Registration is the lender's own responsibility precisely because the consequence of missing it is total." },
          ],
          result:
            "The **first and widest** charge is the one that fails, purely on **late registration**. The debt survives but the security does not, and Bank A joins the unsecured queue behind the preferential creditors.",
        },
      ],
      check: {
        q: "A lender takes a charge but registers it 30 days after creation. What is the position on the company's liquidation?",
        options: [
          "The charge is valid, since registration eventually took place",
          "The charge is void against the liquidator and other creditors, so the lender is unsecured — but the debt itself remains recoverable",
          "Both the charge and the loan are void",
          "The charge ranks behind other charges but is still security",
        ],
        correct: 1,
        explain:
          "The charge is VOID as security against the liquidator, an administrator and any creditor, because it was not registered within 21 DAYS. The lender becomes UNSECURED. The LOAN itself remains valid and indeed immediately payable — losing the security is not the same as losing the debt.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying failure to register makes the loan void.",
      fix: "The CHARGE is void as security; the debt remains recoverable and becomes immediately payable.",
    },
    {
      trap: "Assuming an earlier floating charge beats a later fixed charge.",
      fix: "A fixed charge generally ranks ahead, unless the later chargee had notice of a negative pledge.",
    },
    {
      trap: "Forgetting the preferential creditors and the prescribed part.",
      fix: "A floating charge is subordinated to both.",
    },
    {
      trap: "Treating an internal borrowing limit as defeating the lender.",
      fix: "A good-faith third party is generally unaffected; the directors are liable to the company instead.",
    },
  ],
  keyTerms: [
    { term: "Debenture", def: "A document acknowledging a company's indebtedness, secured or unsecured." },
    { term: "Fixed charge", def: "Security over specific identified assets which the company cannot dispose of free of the charge." },
    { term: "Floating charge", def: "Security over a class of assets the company may deal with until crystallisation." },
    { term: "Crystallisation", def: "The conversion of a floating charge into a fixed charge over the assets then in the class." },
    { term: "Negative pledge", def: "A clause prohibiting the creation of later charges ranking ahead; effective against a chargee with notice." },
    { term: "Prescribed part", def: "The portion of floating charge realisations set aside for unsecured creditors." },
    { term: "Registration of charges", def: "Filing with the registrar within 21 days; failure makes the charge void against liquidator, administrator and creditors." },
  ],
  summary: [
    "A debenture acknowledges indebtedness and may be secured or unsecured.",
    "Interest is payable whether or not there are profits, while dividends depend on distributable profits.",
    "A fixed charge attaches to identified assets and generally outranks a floating charge, even a later fixed one.",
    "A floating charge lets the company trade the assets but ranks behind preferential creditors and the prescribed part.",
    "Charges must be registered within 21 days, and failure makes the security void while leaving the debt recoverable.",
  ],
  knowledgeDiagnostic: [
    { q: "State the effect of failing to register a charge in time.", a: "The charge is void as security against a liquidator, administrator and any creditor, so the lender is unsecured; the debt remains valid and becomes immediately payable." },
    { q: "Name the four crystallisation events.", a: "Liquidation, cessation of business, appointment of a receiver or administrator or enforcement, and any event specified in the charge instrument." },
    { q: "Why does a lender prefer a fixed charge?", a: "It ranks ahead of a floating charge over the same assets and is not subordinated to preferential creditors or the prescribed part, and the company cannot dispose of the assets free of it." },
    { q: "What is a negative pledge and when does it work?", a: "A clause in a floating charge prohibiting later charges ranking ahead; it binds a later chargee who had notice of it." },
  ],
}

export const LWE_TREE_AREA_E_PART1: StudyChapter[] = [LWE_TREE_34, LWE_TREE_35]
