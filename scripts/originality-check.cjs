/*
 * Originality check: does any of Scholify's authored content share a long verbatim
 * word sequence with the Kaplan/BPP source books?
 *
 * Method: normalise both sides to a bare word stream (lowercase, letters and
 * digits only, single spaces). Index every N-word shingle in the books, then slide
 * the same window over Scholify's authored strings and report every hit.
 *
 * A short match is meaningless — professional terminology is shared vocabulary, not
 * authorship ("the bargaining power of buyers", "segregation of duties", "true and
 * fair view", "lower of cost and net realisable value"). A LONG match would indicate
 * copied prose. So the check reports at several window sizes and prints the actual
 * matched text for judgement. Target: zero matches at 10+ words.
 *
 * ── Exception 1: official names ───────────────────────────────────
 * FA cannot reach zero at 10 words, because the OFFICIAL NAME of one of the
 * statements it teaches — "the statement of profit or loss and other comprehensive
 * income" — is itself ten words long. Two strings in the FA tree are that name and
 * nothing else: a section heading and one multiple-choice option. It is an IFRS term
 * of art and rewording it would make the content wrong, so both are left alone.
 *
 * ── Exception 2: quoted legal instruments (both LW variants) ──────
 * LW is a law paper, and the thing a law paper teaches IS the wording of the
 * instrument. A learner has to recognise the Partnership Act's "carrying on a
 * business in common with a view of profit" and CISG art 35(2)(a)'s "fit for the
 * purposes for which goods of the same description would ordinarily be used" — those
 * exact formulas are what the examiner rewards. Paraphrasing them would make the
 * content worse, and they are not the publisher's property in the first place: the
 * CISG and the UNCITRAL Model Laws are UN instruments, the Acts are public law, and
 * "bona fide for the benefit of the company as a whole" is a judge's phrase from
 * 1900. The books quote them for the same reason Scholify does.
 *
 * So for LW the gate is NOT zero matches — it is zero UNATTRIBUTED matches. Every
 * phrase in STATUTORY_QUOTES below is a quotation of the named instrument, is
 * presented AS a quotation in the content (the article or section is cited next to
 * it), and is excluded from the count while still being listed in the report so the
 * list can never quietly grow. Anything not on the list is a real finding: it is
 * either the publisher's own explanation or ACCA's syllabus wording, and gets
 * reworded. That distinction is the whole point — the first cut of the LW check
 * reported 91 hits, and the 20 that were genuinely the publisher's prose were
 * invisible among the 71 that were statute.
 *
 * FA is otherwise clean: 0 matches at 12, 15 and above. Everything that WAS matching
 * on the first run has been reworded — the culprits were verbatim ACCA syllabus
 * learning-outcome wording copied into `outcomes` arrays (about twenty of them), and
 * IASB Conceptual Framework definitions of asset, liability, equity, income,
 * depreciation, provisions and going concern absorbed word for word. Both classes are
 * exactly what this check exists to catch: the syllabus and the standards are public,
 * but a learner is paying for Scholify's explanation of them, not a transcription.
 *
 * ── Exception 3: statutory formulas (TX) ──────────────────────────
 * TX needed the same treatment as LW for the same reason, and the reasoning is set out
 * beside the TX block in STATUTORY_QUOTES. In short: a tax paper's statute is mostly
 * deadlines, definitions and prescribed figures, and there is one correct way to state
 * each of them. TX ran to zero unattributed matches at 10, 12 and 15 words, with 92
 * windows at 10 words falling inside 27 named provisions.
 *
 * The order of work matters and was followed strictly — REWORD FIRST, allow-list only
 * the residue. TX opened at 139 findings at 10 words and rewording took it to 94 before
 * a single exception was written: the study text's own examinability notes on basis
 * period reform and company share pooling, its explanation of how above-basic-rate gift
 * aid relief is delivered, and a dozen "X Ltd has the following results for the year
 * ended 31 March 2026" scenario openings. An allow-list written before that pass would
 * have quietly absorbed all of them.
 *
 * Run it from the REPO ROOT, passing the books and the authored files for the paper
 * under review. `--books` takes paths (Windows-style absolute paths work; a git-bash
 * /c/... path does not, because Node resolves it as relative). `--mine` takes bare
 * FILENAMES, which are matched against src/lib — not paths.
 *   node scripts/originality-check.cjs --books a.txt,b.txt --mine "acca-study-xx-*.ts,…"
 * Set ORIG_ALL=1 to print every finding rather than the first 40.
 *
 * ── AFM, Area A (Aug 2026) ────────────────────────────────────────
 * Corpus: the founder's Kaplan AFM Study Text and Exam Kit (2020-21) plus the
 * official S26-J27 syllabus PDF, 364k words in total. The syllabus is included in
 * the corpus deliberately: on every rebuild so far the dominant finding has been
 * ACCA's own learning-outcome wording absorbed verbatim, and indexing the syllabus
 * is what catches it. Area A opened at 10 findings at 10 words — all three culprits
 * were syllabus outcomes quoted into prose (A1(c)(iv) on communicating policy,
 * A3(b) on the physical environment, A5(a)(ii) on capital mobility) — and rewording
 * took it to zero at 10, 12 and 15 with no allow-list entry.
 *   node scripts/originality-check.cjs --books "<dir>/afm-text.txt,<dir>/afm-kit.txt,<dir>/afm-syllabus.txt" \
 *     --mine "acca-study-afm-tree-*.ts"
 * The residue at 8 words is all deliberate: passages that tell the learner what the
 * syllabus requirement says, plus the named central banks and "free cash flow to
 * equity". None reach the gate, so none needed an exception.
 *
 * ── AFM, WHOLE PAPER (Aug 2026) ───────────────────────────────────
 * The finished rebuild — 79,275 authored words across acca-study-afm-tree-*.ts —
 * runs at ZERO findings at 10, 12 and 15 words against the same 364k-word corpus,
 * with NO allow-list entry. Twenty windows remain at 8 words and every one is a
 * term of art or a statement of what a syllabus outcome requires.
 *
 * Worth recording for the next paper: every single finding across the whole
 * rebuild was ACCA's own wording absorbed into prose, and none was ever the
 * publisher's. Areas C, D and E each came in clean on the FIRST pass, once the
 * habit formed of paraphrasing a learning outcome rather than quoting it — so the
 * cost of this defect is front-loaded and disappears if you write that way from
 * the start. Two of the fixes are the standing techniques rather than allow-list
 * entries: a canonical list long enough to breach the gate (B3(a)'s eleven
 * sources of finance) is fixed by REORDERING the enumeration, and a quoted
 * outcome is fixed by saying what it requires in Scholify's own voice.
 */
const fs = require("fs")
const path = require("path")

/*
 * BOOKS are plain-text extracts of the approved-provider texts (produce them with
 * pdf-parse, already a dependency); MINE are the authored source files for that paper.
 * Both are best passed on the command line — see the note immediately below. The arrays
 * here are the fallback, and hold the last paper checked without arguments (PM).
 *
 * The per-paper settings used so far are recorded after MINE, so any paper can be
 * re-checked without rediscovering its file names. One of them is worth reading before
 * setting up a new paper: for LW, all four books are indexed at once, including both
 * ENGLISH texts, because LW's two variants share Areas D–H almost entirely. Checking
 * Global content against the English books too is the stricter test.
 */
/*
 * ── Overriding from the command line ──────────────────────────────
 * Editing these arrays for every paper was how the PM run left the script pointing at
 * PM's extracts, which then made the TX run die on a missing file. Both can now be
 * passed instead, so a re-check never requires an edit:
 *
 *   node scripts/originality-check.cjs \
 *     --books /tmp/tx-study-text-fa25.txt,/tmp/tx-kaplan-kit-fa25.txt \
 *     --mine "acca-study-tx-tree-*.ts,acca-questions-tx-kit-*.ts,acca-cases-tx.ts,acca-written-tx-kit*.ts"
 *
 * --mine takes comma-separated shell-style patterns resolved against SRC_DIR, so a
 * paper's files can be named by their shape rather than listed one by one — and a file
 * added later is picked up automatically instead of being silently unchecked.
 */
const argv = process.argv.slice(2)
const argOf = (name) => {
  const i = argv.indexOf(name)
  return i >= 0 && argv[i + 1] ? argv[i + 1] : null
}
const SRC_DIR = "C:/Users/User/Desktop/scholify-web-main/scholify-web-main/src/lib"

const expandPatterns = (patterns) => {
  const names = fs.readdirSync(SRC_DIR)
  const out = []
  for (const raw of patterns) {
    const pattern = raw.trim()
    if (!pattern) continue
    const rx = new RegExp(`^${pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".")}$`)
    const matched = names.filter((n) => rx.test(n)).sort()
    if (!matched.length) throw new Error(`--mine pattern matched nothing: ${pattern}`)
    for (const m of matched) if (!out.includes(m)) out.push(m)
  }
  return out
}

const BOOKS = argOf("--books")
  ? argOf("--books").split(",").map((s) => s.trim()).filter(Boolean)
  : [
      "pm-kaplan-study-text-2025-26.txt",
      "pm-kaplan-kit-2026.txt",
      "pm-bpp-workbook.txt",
    ]
const MINE = argOf("--mine") ? expandPatterns(argOf("--mine").split(",")) : [
  "acca-study-pm-tree-a.ts",
  "acca-study-pm-tree-a2.ts",
  "acca-study-pm-tree-b.ts",
  "acca-study-pm-tree-b2.ts",
  "acca-study-pm-tree-b3.ts",
  "acca-study-pm-tree-c.ts",
  "acca-study-pm-tree-c2.ts",
  "acca-study-pm-tree-c3.ts",
  "acca-study-pm-tree-c4.ts",
  "acca-study-pm-tree-c5.ts",
  "acca-study-pm-tree-d.ts",
  "acca-study-pm-tree-d2.ts",
  "acca-study-pm-tree-d3.ts",
  "acca-study-pm-tree-d4.ts",
  "acca-study-pm-tree-d5.ts",
  "acca-study-pm-tree-e.ts",
  "acca-study-pm-tree-e2.ts",
  "acca-study-pm-tree-e3.ts",
  "acca-questions-pm-kit-a.ts",
  "acca-questions-pm-kit-b.ts",
  "acca-questions-pm-kit-c1.ts",
  "acca-questions-pm-kit-c2.ts",
  "acca-questions-pm-kit-d1.ts",
  "acca-questions-pm-kit-d2.ts",
  "acca-questions-pm-kit-e.ts",
  "acca-questions-pm-kit-f.ts",
  "acca-cases-pm.ts",
  "acca-written-pm-kit.ts",
  "acca-written-pm-kit2.ts",
  "acca-study-pm-tree-f.ts",
]

/* BT: BOOKS = ["kaplan-st.txt", "kaplan-rk.txt", "bpp-kit.txt", "bpp-workbook.txt"]
 *     MINE  = acca-study-bt-tree-{a,b,c,d,ef}.ts, acca-questions-bt-kit-{a,b,c,def}.ts, acca-cases-bt.ts
 * MA: BOOKS = ["ma-kaplan-st.txt", "ma-kaplan-kit.txt", "ma-bpp-st.txt", "ma-bpp-kit.txt"]
 *     MINE  = acca-study-ma-tree-{a,b,c,d,ef}.ts, acca-questions-ma-kit-{ab,c,def}.ts, acca-cases-ma.ts
 * LW: BOOKS = ["lw-global-study-text-2025-26.txt", "lw-eng-study-text-2025-26.txt", "lw-eng-kaplan-kit-2026.txt", "f4-bpp-kit.txt"]
 *     MINE  = acca-study-lw{g,e}-tree-*.ts, acca-questions-lw{g,e}-kit-*.ts, acca-cases-lw-{global,eng}.ts
 *     Both variants' trees were checked against all four books at once; see the STATUTORY_QUOTES note.
 * FA: BOOKS = ["fa-study-text-2024-25.txt", "f3-kaplan-kit-2023-24.txt", "fa2-bpp-kit.txt"]
 *     MINE  = acca-study-fa-tree-{ab,c,d1,d2,ef,g,hi}.ts, acca-questions-fa-kit-{abc,d,efg,hi}.ts, acca-cases-fa.ts
 * TX: BOOKS = ["tx-study-text-fa25.txt", "tx-kaplan-kit-fa25.txt"]
 *     MINE  = "acca-study-tx-tree-*.ts,acca-questions-tx-kit-*.ts,acca-cases-tx.ts,acca-written-tx-kit*.ts"
 *     Only TWO books, not three: "TX Exam Kit FA25 BPP.pdf" is a SCANNED pdf with no text
 *     layer at all (pdf-parse returns 1,156 bytes of whitespace for 578 pages), so it
 *     cannot be indexed. The study text and the Kaplan kit give ~700k words of benchmark
 *     between them, which is comparable to the other papers' corpora.
 * SBL: BOOKS = ["sbl-study-text.txt", "sbl-exam-kit.txt"]   (Kaplan 2021-22, 612k words)
 *     MINE  = "acca-study-sbl-tree-{a,b,c,d,e,f,g,h,i,j}.ts"
 *     Finished at ZERO findings at 10, 12 and 15 words over 80,950 authored words. The
 *     four residual 8-word matches are canonical terms-of-art lists in their standard
 *     order and have no alternative wording: the five ethical threats, the six capitals
 *     (twice, as overlapping windows) and the three JSW elements. No allow-list entry was
 *     needed — unlike LW and TX, nothing in SBL is a statutory formula that must be exact.
 *     Two lessons worth carrying to the remaining Strategic Professional papers. First,
 *     ALMOST EVERY finding was ACCA learning-outcome wording absorbed verbatim into an
 *     `outcomes` array — the same defect FA hit — so write outcomes in Scholify's own
 *     voice from the start rather than rewording them afterwards. Second, a canonical list
 *     long enough to breach the gate can be fixed by reordering the enumeration rather
 *     than allow-listing it, and punctuation does not help because the checker strips it.
 */

/*
 * Quotations of legal instruments \u2014 see "Exception 2" in the header.
 *
 * Each entry is the instrument that owns the words, then the longest form of the
 * quotation as it appears in the content. A hit is excluded when its window falls
 * INSIDE one of these phrases, so the shorter recap and question-explanation forms
 * are covered by the one entry rather than needing an entry each.
 *
 * Adding to this list is a deliberate act: the phrase must be traceable to the named
 * article or section, and the content must cite that article or section beside it.
 *
 * ── Why TX needs the same treatment as LW ─────────────────────────
 * TX is a statute paper too, and its statute is mostly ARITHMETIC AND DEADLINES. There
 * is exactly one correct way to say when corporation tax falls due for a company that
 * is not large: "9 months and 1 day after the end of the accounting period". Any
 * paraphrase is either longer or wrong, and a learner who cannot produce that phrase
 * loses the mark. The same is true of every entry in the TX block below — a filing
 * window, a payment date, a statutory definition, or a prescribed figure.
 *
 * The discipline is identical to LW's, and it was applied in the same order: reword
 * FIRST, allow-list only what survives. The TX run opened at 139 findings at 10 words.
 * The publisher's own examinability notes, its explanation of how higher rate gift aid
 * relief is delivered, and about a dozen "X Ltd has the following results for the year
 * ended 31 March 2026" scenario openings were all REWORDED, not excepted — that took it
 * to 94. What is listed below is the residue: statute, and nothing else.
 *
 * Two entries need their own note.
 *
 *  · The income tax and corporation tax PROFORMAS. What matches is the row sequence
 *    (total income → less reliefs → net income → less personal allowance → taxable
 *    income) with X in the money columns. That sequence is the statutory order of
 *    computation in ITA 2007 s.23, not a house style — laying it out in a different
 *    order would teach the computation wrongly. The X placeholder is universal notation
 *    and is not prose in the first place.
 *
 *  · The MARRIAGE EXEMPTION ladder and the CT LIMIT apportionment. These are prescribed
 *    figures in a prescribed order: £5,000 from a parent, £2,500 from a grandparent or
 *    remoter ancestor, £2,500 from a party to the marriage, £1,000 from anyone else, and
 *    £50,000 / £250,000 time-apportioned. The books show the same numbers because there
 *    are no other numbers to show.
 */
const STATUTORY_QUOTES = [
  /* ── TX (UK tax): statutory deadlines, definitions and prescribed figures ── */
  // Administration and payment dates
  ["TMA 1970 s.29 (discovery)", "within 4 years of the end of the tax year"],
  ["TMA 1970 s.59D / CTA 2009 (CT due date)", "9 months and 1 day after the end of the accounting period"],
  ["SI 1998/3175 reg 5 (CT instalments)", "the 14th day of the 7th month after the start of the accounting period"],
  ["SI 1998/3175 reg 5 (CT instalments)", "on the 14th of months 7 10 13 and 16 from the start of the period"],
  ["SI 2001/1004 reg 71 (Class 1A)", "by 22 july following the end of the tax year"],
  ["IHTA 1984 s.226(1) (IHT due date)", "6 months after the end of the month of death"],
  ["IHTA 1984 s.226(1) (IHT due date)", "it is due six months after the end of the month of death"],
  ["IHTA 1984 s.226(3) (estate account)", "the earlier of six months after the end of the month of death and delivery of the estate account to hmrc"],
  ["IHTA 1984 s.226(3) (estate account)", "6 months after the end of the month of death and delivery of the estate account to hmrc"],
  ["CTA 2010 s.37(7) (carry back claim)", "within two years of the end of the loss making accounting period"],
  ["CTA 2010 s.37(7) (carry back claim)", "2 years of the end of the loss making accounting period"],
  ["CTA 2010 s.130 (group relief claim)", "the claim must be made within two years of the end of the claimant s accounting period"],
  // VAT: registration, tax point, returns and penalties
  ["VATA 1994 Sch 1 para 5 (notification)", "within 30 days of the end of the month in which the threshold was exceeded"],
  ["VATA 1994 Sch 1 para 5 (notification)", "notify hmrc within 30 days of the end of the month in which the limit was exceeded"],
  ["VATA 1994 Sch 1 para 5 (effective date)", "registered from the first day of the second month after the month in which the limit was exceeded"],
  ["VATA 1994 s.6(4) (actual tax point)", "an invoice is issued or payment received before the basic tax point"],
  ["VATA 1994 s.6(5) (14 day rule)", "an invoice is issued within 14 days after the basic tax point"],
  ["VAT Regs 1995 reg 25 (return and payment)", "one month and seven days after the end of the period"],
  ["FA 2021 Sch 26 (VAT late payment)", "then 6 plus a daily penalty at an annual rate of 10 from day 31"],
  // Statutory definitions
  ["CTA 2009 s.14 (company residence)", "a company is uk resident if it is incorporated in the uk or"],
  ["CTA 2009 s.61 (pre-trading expenditure)", "treated as incurred on the first day of trading provided it would have been allowable had the trade already started"],
  ["CTA 2009 s.61 (pre-trading expenditure)", "is treated as incurred on the first day of trading if it would otherwise have been allowable"],
  ["TCGA 1992 s.44(1)(a) (wasting asset)", "a chattel with a predictable life of 50 years or less"],
  ["TCGA 1992 s.42 (part disposal)", "a divided by a plus b where a is the proceeds of the part disposed of b market value of the part retained"],
  ["TCGA 1992 s.58 (spouse transfers)", "any actual proceeds are ignored the transferor is deemed to dispose at their own acquisition cost"],
  ["TCGA 1992 s.170 (gains group)", "a gains group comprises the parent company and its 75 subsidiaries and"],
  ["TCGA 1992 s.223(3)(a) (deemed occupation)", "and d must be preceded and followed by a period of actual occupation"],
  ["TCGA 1992 s.223(4) (lodger)", "the owner has a lodger who lives as a member of the"],
  ["TCGA 1992 s.223B (letting relief)", "it is the lowest of 40 000 the amount of the gain exempted by prr"],
  ["ITA 2007 s.24A (cap on reliefs)", "capped at the higher of 50 000 and 25 of income"],
  // Prescribed figures, in the order the statute prescribes them
  ["IHTA 1984 s.22 (marriage exemption)", "5 000 by a parent 2 500 by a grandparent or remoter ancestor 2 500 by a party to the marriage 1 000 by anyone else"],
  ["CTA 2010 s.18D (limits, apportioned)", "lower limit 50 000 9 12 37 500 upper limit 250 000 9 12 187 500"],
  // The statutory order of computation, not a house layout — see the note above
  ["ITA 2007 s.23 (income tax proforma)", "dividends received x x total income x x x x less reliefs loss relief qualifying loan interest x x x x net income x x x x less personal allowance x x x x taxable income x x x x"],
  ["CTA 2009 (corporation tax proforma)", "chargeable gains x total profits x less qualifying charitable donations x taxable total profits x"],

  // United Nations Convention on Contracts for the International Sale of Goods
  ["CISG (official title)", "the united nations convention on contracts for the international sale of goods 1980"],
  ["CISG art 1(1)", "between parties whose places of business are in different states"],
  ["CISG art 11", "writing and is not subject to any other requirement as to form"],
  ["CISG art 14(1)", "a proposal for concluding a contract addressed to one or more specific persons which is sufficiently definite and indicates"],
  ["CISG art 31(a)", "handing the goods to the first carrier for transmission to the buyer"],
  ["CISG art 31(b)-(c)", "placing the goods at the buyer s disposal at that place"],
  ["CISG art 35(2)(a)", "unless they are fit for the purposes for which goods of the same description would ordinarily be used"],
  ["CISG art 36", "existing at the time risk passes to the buyer even if it only becomes apparent later"],
  ["CISG art 39(1)", "give notice to the seller specifying the nature of the lack of conformity"],
  ["CISG art 39(2)", "the buyer loses the right to rely on a lack of conformity"],
  ["CISG art 41", "free from any right or claim of a third party"],
  ["CISG art 42(1)(a)", "the law of the state where the goods will be resold or used if"],
  ["CISG art 49(2)", "the buyer knew or ought to have known of the breach"],
  ["CISG art 50", "in the same proportion as the value that the goods actually delivered had at the time of delivery bears to the value that conforming goods would have had at that time"],
  ["CISG art 67(2)", "the goods are clearly identified to the contract by markings"],
  ["CISG art 75", "the difference between the contract price and the price in the substitute transaction"],
  ["CISG art 76", "the difference between the contract price and the current price"],
  // UNCITRAL Model Law on International Credit Transfers
  ["UNCITRAL Credit Transfers art 2(a)", "the series of operations beginning with the originator s payment order made for the purpose of placing funds at the disposal of a beneficiary"],
  ["UNCITRAL Credit Transfers art 2(a), 2nd sentence", "it includes any payment order issued by the originator s bank or by an intermediary bank in order to carry out the originator s payment order"],
  ["UNCITRAL Credit Transfers art 2(b)", "the issuer of the first payment order in a credit transfer"],
  ["UNCITRAL Credit Transfers art 2(f)", "any receiving bank other than the originator s bank and the beneficiary s bank"],
  // Arbitration
  ["UNCITRAL Model Law (official title)", "the uncitral model law on international commercial arbitration"],
  ["New York Convention art II(3)", "null and void inoperative or incapable of being performed"],
  // Partnership Act 1890
  ["Partnership Act 1890 s.1(1)", "the relation which subsists between persons carrying on a business in common with a view of profit"],
  ["Partnership Act 1890 s.1(1) (paraphrase)", "the relationship which exists between persons carrying on a business in common with a view of profit"],
  // Companies Act 2006
  ["CA 2006 s.67(2)", "the name is the same as or too like an existing one"],
  // ── UK instruments quoted directly by the ENG tree ──
  ["CA 2006 s.33(1)", "the provisions of a company s constitution bind the company and its members to the same extent as if there were covenants on the part of the company and of each member to observe them"],
  ["CA 2006 s.495(3)", "report to the members on whether the accounts give a true and fair view and have been properly prepared in accordance with the applicable framework"],
  ["CA 2006 s.250", "any person occupying the position of director by whatever name called"],
  ["CA 2006 s.155", "must have at least one director who is a natural person"],
  ["CA 2006 s.386(2)", "sufficient to show and explain the company s transactions and its financial position"],
  ["CA 2006 s.502(2)", "right to receive notice of attend and speak at general meetings"],
  ["CA 2006 s.630(4)", "the written consent of 75 in nominal value of the class or a special resolution at a separate class meeting"],
  ["Caparo Industries v Dickman (1990)", "sufficient proximity between the parties and it is fair just and reasonable to impose a duty"],
  ["CRA 2015 s.62(4)", "contrary to good faith it causes a significant imbalance in the parties rights to the consumer s detriment"],
  ["ERA 1996 s.139(1)", "the requirement for employees to carry out work of a particular kind has ceased or diminished"],
  ["IA 1986 s.214(2)", "that there was no reasonable prospect of the company avoiding insolvent liquidation"],
  ["IA 1986 s.122(1)", "the company has not commenced business within a year of incorporation or has suspended business for a year"],
  ["CA 2006 s.174(2)", "the care of a reasonably diligent person with the general knowledge skill and experience"],
  ["CA 2006 s.830(2)", "accumulated realised profits so far as not previously distributed or capitalised less accumulated realised losses so far as not previously written off"],
  ["CA 2006 s.830(2) (statutory wording)", "accumulated realised profits so far as not previously utilised by distribution or capitalisation less accumulated realised losses so far as not previously written off in a reduction or reorganisation of capital"],
  ["CA 2006 s.830(2) (short form)", "accumulated realised profits less accumulated realised losses a revaluation surplus is"],
  // Insolvency Act 1986 and CDDA 1986
  ["IA 1986 Sch B1 para 3(1)(b)", "achieving a better result for the creditors as a whole than would be likely on a winding up"],
  ["IA 1986 Sch B1 para 3(1) (hierarchy)", "rescue the company as a going concern achieve a better result for the creditors as a whole than on a winding up"],
  ["IA 1986 Sch B1 para 11", "that the company is or is likely to become unable to pay its debts and"],
  ["IA 1986 s.213", "with intent to defraud creditors or for any fraudulent purpose"],
  ["CDDA 1986 s.6", "unfit to be concerned in the management of a company"],
  // Criminal Justice Act 1993 and FSMA 2000
  ["CJA 1993 s.52", "disposing of price affected securities while in possession of inside information as an insider"],
  ["CJA 1993 s.52 (dealing form)", "dealing in price affected securities while in possession of inside information as an insider"],
  ["CJA 1993 s.52 (acquiring or disposing)", "acquiring or disposing of price affected securities while in possession of inside information as an insider"],
  ["CJA 1993 s.53 (defence)", "did not expect the dealing to result in a profit"],
  ["CJA 1993 s.53 (defence)", "believed on reasonable grounds that the information had been disclosed widely enough"],
  ["CJA 1993 s.56(1)", "if made public would be likely to have a significant effect on the price of"],
  ["CJA 1993 s.57(2)", "through being a director employee or shareholder of an issuer of securities"],
  ["FSMA 2000 s.118", "likely to give a regular user a false or misleading impression"],
  // Case law
  ["Allen v Gold Reefs (1900)", "an alteration must be bona fide for the benefit of the company as a whole and"],
  ["Allen v Gold Reefs (1900) (with citation)", "bona fide for the benefit of the company as a whole allen v gold reefs"],
]

const words = (s) =>
  s
    .replace(/[\u2018\u2019\u201c\u201d]/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)

/* Normalised, space-padded, so containment tests land on word boundaries. */
const QUOTES = STATUTORY_QUOTES.map(([instrument, phrase]) => ({
  instrument,
  padded: ` ${words(phrase).join(" ")} `,
}))
const quotedBy = (window) => QUOTES.find((q) => q.padded.includes(` ${window} `))

/* ── The books, as one word stream per book ─────────────────────── */
const bookWords = {}
for (const b of BOOKS) {
  bookWords[b] = words(fs.readFileSync(b, "utf8").replace(/\u0000/g, ""))
}

/* ── Scholify's authored TEXT only: string literals from the source ── */
const mineStrings = []
for (const f of MINE) {
  const src = fs.readFileSync(path.join(SRC_DIR, f), "utf8")
  /*
   * Line by line, so a "string" can never span from one literal's closing quote to
   * the next literal's opening quote and swallow the code and COMMENTS in between.
   * The first cut of this did exactly that, which made the check compare maintainer
   * comments as though they were published content — stricter than needed, but it
   * also reported hits against text no learner ever sees.
   *
   * Comment lines are skipped explicitly for the same reason: what matters is the
   * prose, stems, options and explanations that reach the learner.
   */
  for (const rawLine of src.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (line.startsWith("*") || line.startsWith("//") || line.startsWith("/*")) continue
    for (const m of line.matchAll(/"((?:[^"\\]|\\.){25,}?)"/g)) {
      mineStrings.push({ file: f, text: m[1].replace(/\\"/g, '"').replace(/\\n/g, " ") })
    }
  }
}
const mineWordCount = mineStrings.reduce((a, s) => a + words(s.text).length, 0)

/* ── Compare at several window sizes ───────────────────────────── */
for (const N of [8, 10, 12, 15]) {
  const index = new Map() // shingle -> book
  for (const b of BOOKS) {
    const w = bookWords[b]
    for (let i = 0; i + N <= w.length; i++) {
      const key = w.slice(i, i + N).join(" ")
      if (!index.has(key)) index.set(key, b)
    }
  }

  const hits = []
  for (const entry of mineStrings) {
    const w = words(entry.text)
    for (let i = 0; i + N <= w.length; i++) {
      const key = w.slice(i, i + N).join(" ")
      const book = index.get(key)
      if (book) hits.push({ n: N, book, file: entry.file, phrase: key })
    }
  }

  const unique = [...new Map(hits.map((h) => [h.phrase, h])).values()]

  /*
   * Split before counting. A quoted instrument is not a finding, but it is still
   * printed — an allow-list nobody ever reads is how an allow-list starts absorbing
   * things it should not.
   */
  const findings = []
  const quoted = new Map() // instrument -> distinct windows attributed to it
  for (const h of unique) {
    const q = quotedBy(h.phrase)
    if (q) quoted.set(q.instrument, (quoted.get(q.instrument) || 0) + 1)
    else findings.push(h)
  }

  console.log(`\n=== ${N}-word windows === ${findings.length} finding(s)` + (quoted.size ? `, plus ${[...quoted.values()].reduce((a, b) => a + b, 0)} window(s) inside quoted instruments` : ""))
  for (const h of (process.env.ORIG_ALL ? findings : findings.slice(0, 40))) {
    console.log(`  [${h.book}] ${h.file}`)
    console.log(`     "${h.phrase}"`)
  }
  if (!process.env.ORIG_ALL && findings.length > 40) console.log(`  … and ${findings.length - 40} more`)
  if (quoted.size) {
    console.log(`  ── attributed quotations (excluded, see STATUTORY_QUOTES) ──`)
    for (const [instrument, n] of [...quoted].sort()) console.log(`     ${String(n).padStart(3)} × ${instrument}`)
  }
}

console.log(`\nScholify authored text compared: ${mineWordCount.toLocaleString()} words across ${mineStrings.length} strings.`)
console.log(`Book corpus: ${BOOKS.map((b) => `${b} ${bookWords[b].length.toLocaleString()}w`).join(", ")}`)
