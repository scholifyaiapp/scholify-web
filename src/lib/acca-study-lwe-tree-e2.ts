import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area E, final chapter — capital maintenance and dividend law.
 * Chapter 36 of the LW-ENG reading tree, mapped to syllabus group E3.
 *
 * This is the chapter the Global tree could not teach properly. Distributable profits
 * are a specific statutory test, and a public company faces an ADDITIONAL net-assets
 * test that frequently bites BEFORE the profits test does — so a chapter that says
 * "apply the rule the scenario supplies" leaves the learner computing the wrong answer
 * with confidence. Every figure here is stated as CA 2006 states it.
 *
 * It also closes the loop opened in chapter 22: a negligent audit that overstates
 * profits produces an unlawful distribution, which reaches the shareholders under s.847
 * and the directors under their duty of care.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named.
 */

/* ── Chapter 36 · E3 ───────────────────────────────────────────── */

export const LWE_TREE_36: StudyChapter = {
  id: "LWE-36",
  number: 36,
  paper: "LW",
  area: "E",
  title: "Capital maintenance and dividend law",
  minutes: 18,
  syllabusRefs: ["E3(a)", "E3(b)"],
  intro:
    "Share capital is the creditors' buffer, so the law is deeply suspicious of anything that hands it back to members. Dividends are the everyday example, and for a public company the test that actually bites is not the one candidates reach for first.",
  outcomes: [
    "Explain the doctrine of capital maintenance and why it exists",
    "Explain the routes by which capital may lawfully be reduced",
    "Explain the rules on a company purchasing its own shares",
    "Apply the distributable profits test, and the additional public company net-assets test",
    "State the consequences of an unlawful distribution for members and directors",
  ],
  sections: [
    {
      id: "maintenance",
      heading: "The doctrine, and reducing capital lawfully",
      blocks: [
        {
          kind: "definition",
          term: "Capital maintenance",
          md: "The principle that a company's **share capital** is a **permanent fund available to creditors**, and may not be returned to members except by a procedure the law permits. Creditors deal with the company on the strength of its stated capital, so the law protects that figure — the members accepted limited liability, and the price of it is that their capital stays in.",
        },
        {
          kind: "list",
          title: "What the doctrine prohibits",
          items: [
            "**Paying dividends other than out of distributable profits.**",
            "**Purchasing or redeeming its own shares**, except by the permitted routes below.",
            "**Reducing share capital** without following the statutory procedure.",
            "**Issuing shares at a discount** to nominal value (chapter 34).",
            "For a **public company**, giving **financial assistance** for the acquisition of its own shares.",
          ],
        },
        {
          kind: "table",
          caption: "Reducing capital lawfully",
          head: ["Route", "What it requires"],
          rows: [
            ["**Solvency statement route** — private companies only", "A **special resolution** supported by a **solvency statement** from all the directors, that the company can pay its debts now and for the next twelve months. No court involvement, which makes it the practical route"],
            ["**Court confirmation route** — any company", "A **special resolution** plus **confirmation by the court**, which will consider creditors' interests and may require their consent or the securing of their debts"],
            ["**Purchase or redemption of own shares**", "Permitted on the conditions below"],
            ["**Cancellation of treasury shares**, or of shares of a member who cannot be traced, and reductions ordered by the court on a minority petition", "Specific statutory routes"],
          ],
        },
        {
          kind: "table",
          caption: "Purchase or redemption of a company's own shares",
          head: ["Source of payment", "Position"],
          rows: [
            ["Out of **distributable profits**", "**Permitted** for any company. A **capital redemption reserve** must be created equal to the nominal value cancelled, which is itself **undistributable** — so the capital buffer is preserved in a different name"],
            ["Out of the **proceeds of a fresh issue** of shares", "**Permitted** for any company — capital is replaced with capital"],
            ["Out of **capital**", "**Private companies only**, and subject to strict conditions including a directors' statement and auditors' report, a special resolution, and public notice giving creditors an opportunity to object"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The capital redemption reserve is the doctrine working",
          md: "Why require a reserve when the shares are being cancelled anyway? Because otherwise a buy-back out of profits would quietly **shrink the creditors' buffer**: capital would fall and nothing would replace it. Transferring an equal amount from distributable profits into an **undistributable** capital redemption reserve keeps the total protected fund the same. Understanding that shows you understand capital maintenance rather than just reciting it.",
        },
      ],
      check: {
        q: "A private company wishes to reduce its share capital without going to court. What does it need?",
        options: [
          "An ordinary resolution alone",
          "A special resolution supported by a solvency statement from all the directors",
          "Court confirmation in every case",
          "The consent of all its creditors",
        ],
        correct: 1,
        explain:
          "A SPECIAL RESOLUTION plus a SOLVENCY STATEMENT from ALL the directors, confirming the company can pay its debts now and over the next twelve months. That route is open to PRIVATE companies only. Any company may instead use the COURT CONFIRMATION route, where creditors' interests are considered.",
      },
    },
    {
      id: "dividends",
      heading: "Distributions: the two tests",
      blocks: [
        {
          kind: "definition",
          term: "Distributable profits (s.830)",
          md: "A company may make a distribution **only out of profits available for the purpose**, which s.830(2) defines as \"accumulated, realised profits, so far as not previously utilised by distribution or capitalisation, less accumulated, realised losses, so far as not previously written off in a reduction or reorganisation of capital\".",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Two features of the s.830 test decide most questions",
          md: "First, it is **cumulative, not annual**: you take **accumulated** profits less **accumulated** losses, so a profitable year does **not** create distributable profits while brought-forward losses remain unrecovered. Second, the profits must be **realised** — an **unrealised revaluation surplus** is not distributable, however large. Candidates lose marks by taking this year's profit figure and stopping there.",
        },
        {
          kind: "table",
          caption: "The additional test for a public company (s.831)",
          head: ["", "Private company", "Public company"],
          rows: [
            ["**Test 1 — s.830**", "Accumulated realised profits less accumulated realised losses", "**The same**"],
            ["**Test 2 — s.831**", "**Not applicable**", "**Net assets** must be **at least** the aggregate of **called-up share capital plus undistributable reserves**, and the distribution must not reduce them below that"],
            ["**Practical effect**", "The profits test governs", "**Unrealised LOSSES must effectively be absorbed first**, so a plc can be barred from distributing even where it has realised profits"],
          ],
        },
        {
          kind: "list",
          title: "The undistributable reserves",
          items: [
            "The **share premium account**.",
            "The **capital redemption reserve**.",
            "Any **revaluation reserve** representing unrealised profits — the excess of accumulated unrealised profits over accumulated unrealised losses.",
            "Any other reserve the company is **prohibited from distributing** by statute or by its articles.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "For a plc, test the net assets FIRST",
          md: "The instinct is to compute distributable profits and answer. For a **public** company that gives the wrong figure whenever there are unrealised losses, because **s.831 frequently bites before s.830 does**. So the method for a plc is: work out the s.830 figure, then work out the maximum s.831 permits, and the lawful dividend is the **lower** of the two. A scenario that supplies a revaluation surplus, net assets and a called-up capital figure is telling you to run both tests.",
        },
        {
          kind: "list",
          title: "Procedure and the relevant accounts",
          items: [
            "A **final dividend** is declared by **ordinary resolution** of the members, on the **directors' recommendation**, and the members **cannot vote a larger** dividend than the directors recommended.",
            "An **interim dividend** may be paid by the **directors** alone, without a members' resolution.",
            "Whether a distribution is lawful is judged by reference to the **relevant accounts**, normally the last annual accounts, and interim or initial accounts where those will not do.",
            "A declared final dividend becomes a **debt** owed to the members; an interim dividend may generally be revoked before payment.",
          ],
        },
        {
          kind: "table",
          caption: "Consequences of an unlawful distribution",
          head: ["Who", "Consequence"],
          rows: [
            ["**Members** — s.847", "A member who **knew, or had reasonable grounds to believe**, the distribution was unlawful is **liable to repay** it to the company"],
            ["**Directors**", "Liable for **breach of duty** — to exercise reasonable care, skill and diligence, and to act within their powers (chapter 38) — and may be required to **repay** the sum. They authorised a payment the company had no power to make"],
            ["**Auditors**", "May be liable to the **company** in contract and tort where negligent audit work produced the overstated figures (chapter 22)"],
          ],
        },
        {
          kind: "example",
          title: "Computing a lawful dividend for a plc",
          scenario:
            "Ardenshaw plc has called-up share capital of £2,000,000, a share premium account of £400,000, a revaluation reserve of £250,000 representing an unrealised uplift on its freehold, accumulated realised profits of £760,000 and accumulated realised losses brought forward of £180,000. Its net assets are £2,900,000. The directors propose a final dividend of £600,000. A shareholder asks whether the revaluation surplus could be paid out instead, and what happens if the dividend is paid and later found unlawful.",
          steps: [
            { label: "Apply the s.830 profits test", detail: "Accumulated realised profits £760,000 LESS accumulated realised losses £180,000 = £580,000 of distributable profits. Note it is CUMULATIVE — the brought-forward losses must be recovered first. So the proposed £600,000 ALREADY EXCEEDS this by £20,000." },
            { label: "Identify the undistributable reserves", detail: "Share premium £400,000 PLUS revaluation reserve £250,000 = £650,000 undistributable. Added to called-up capital of £2,000,000, the protected figure is £2,650,000." },
            { label: "Apply the s.831 net-assets test", detail: "Net assets are £2,900,000 and must not fall below £2,650,000. So the maximum distribution on this test is £2,900,000 − £2,650,000 = £250,000." },
            { label: "Take the lower figure", detail: "s.830 permits £580,000; s.831 permits £250,000. The maximum LAWFUL dividend is therefore £250,000 — far below both the £580,000 profits figure and the £600,000 proposed. This is s.831 biting FIRST, which is the point of running both tests for a plc." },
            { label: "Answer the revaluation question", detail: "NO. The £250,000 revaluation reserve is an UNREALISED profit and an UNDISTRIBUTABLE reserve. It can never be the source of a dividend — indeed it is part of what the s.831 test protects." },
            { label: "Deal with an unlawful payment", detail: "Any member who KNEW OR HAD REASONABLE GROUNDS TO BELIEVE the distribution was unlawful must REPAY it under s.847. The DIRECTORS are liable for breach of duty and may be ordered to repay, having authorised a payment the company had no power to make. If overstated audited figures caused it, the AUDITORS may be liable to the company (chapter 22)." },
          ],
          result:
            "The maximum lawful dividend is **£250,000**, not the £600,000 proposed and not the £580,000 the profits test alone suggests. For a **plc the net-assets test frequently governs**, and an unrealised revaluation surplus is never a source of dividend — it is part of the buffer being protected.",
        },
      ],
      check: {
        q: "A plc has £500,000 of distributable profits, but paying a £500,000 dividend would take net assets below called-up capital plus undistributable reserves. What is the maximum lawful dividend?",
        options: [
          "£500,000, since the profits test is satisfied",
          "The lower figure permitted by the s.831 net-assets test — for a plc both tests must be satisfied",
          "£500,000, provided the directors give a solvency statement",
          "Nothing, since the net-assets test has failed",
        ],
        correct: 1,
        explain:
          "The LOWER figure. A public company must satisfy BOTH s.830 (accumulated realised profits less accumulated realised losses) AND s.831 (net assets at least called-up capital plus undistributable reserves). Where s.831 permits less, it governs — and it frequently bites before the profits test does, which is why both must be computed.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using this year's profit as the distributable figure.",
      fix: "The s.830 test is CUMULATIVE: accumulated realised profits less accumulated realised losses.",
    },
    {
      trap: "Treating a revaluation surplus as available for dividend.",
      fix: "It is UNREALISED and an undistributable reserve, and it forms part of what the s.831 test protects.",
    },
    {
      trap: "Applying only the profits test to a public company.",
      fix: "A plc must also satisfy the s.831 net-assets test, and the lawful dividend is the LOWER of the two.",
    },
    {
      trap: "Letting members vote themselves a larger dividend than recommended.",
      fix: "A final dividend is declared by ordinary resolution but cannot exceed the directors' recommendation.",
    },
    {
      trap: "Making only the directors liable for an unlawful distribution.",
      fix: "A member who knew or had reasonable grounds to believe it unlawful must repay under s.847.",
    },
  ],
  keyTerms: [
    { term: "Capital maintenance", def: "The principle that share capital is a permanent fund for creditors and may not be returned to members except as permitted." },
    { term: "Solvency statement route", def: "A private company's reduction of capital by special resolution plus a directors' solvency statement, without court involvement." },
    { term: "Capital redemption reserve", def: "An undistributable reserve created on a buy-back out of profits, equal to the nominal value cancelled." },
    { term: "Distributable profits (s.830)", def: "Accumulated realised profits not previously distributed or capitalised, less accumulated realised losses not previously written off." },
    { term: "Net assets test (s.831)", def: "The additional public company test that net assets must be at least called-up capital plus undistributable reserves." },
    { term: "Undistributable reserves", def: "Share premium, capital redemption reserve, unrealised revaluation surplus, and any reserve otherwise prohibited from distribution." },
    { term: "Section 847", def: "Makes a member who knew or had reasonable grounds to believe a distribution unlawful liable to repay it." },
  ],
  summary: [
    "Share capital is the creditors' buffer and may be returned only by a permitted procedure.",
    "A private company may reduce capital by special resolution plus a solvency statement; any company may use court confirmation.",
    "A buy-back out of profits requires an undistributable capital redemption reserve, preserving the buffer.",
    "Distributable profits are cumulative and realised; a plc must also satisfy the net-assets test, and the lower figure governs.",
    "On an unlawful distribution a knowing member must repay under s.847, and the directors are liable for breach of duty.",
  ],
  knowledgeDiagnostic: [
    { q: "State the s.830 test.", a: "Accumulated realised profits so far as not previously distributed or capitalised, less accumulated realised losses so far as not previously written off." },
    { q: "What extra test applies to a public company, and what follows?", a: "Section 831: net assets must be at least called-up share capital plus undistributable reserves, so unrealised losses must effectively be absorbed first and the lawful dividend is the lower of the two tests." },
    { q: "Why must a capital redemption reserve be created on a buy-back out of profits?", a: "To keep the protected fund constant — capital falls, so an equal amount of distributable profit becomes undistributable in its place." },
    { q: "Who is liable if an unlawful dividend is paid?", a: "A member who knew or had reasonable grounds to believe it was unlawful must repay under s.847, and the directors are liable for breach of duty and may be ordered to repay." },
    { q: "Which reserves are undistributable?", a: "Share premium, the capital redemption reserve, unrealised revaluation surpluses, and any reserve statute or the articles prohibits distributing." },
  ],
}

export const LWE_TREE_AREA_E_PART2: StudyChapter[] = [LWE_TREE_36]
