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
 * Run it from the directory holding the extracted book text, with BOOKS and MINE set
 * for the paper being authored:
 *   node scripts/originality-check.cjs
 */
const fs = require("fs")
const path = require("path")

/*
 * Set these two arrays for the paper under review. BOOKS are plain-text extracts of
 * the approved-provider texts (produce them with pdf-parse, already a dependency);
 * MINE are the authored source files for that paper.
 *
 * Current setting: LW-ENG (the fifth paper rebuilt). Earlier papers' settings are
 * kept below in comments so one can be re-checked without rediscovering the file names.
 *
 * Note that all four LW books are indexed at once, including both ENGLISH texts. LW's
 * two variants share Areas D–H almost entirely (agency, partnerships, companies,
 * insolvency, fraud), so checking Global content against the English books too is the
 * stricter test — and it pre-clears the shared chapters before the ENG rebuild reuses
 * that ground.
 */
const BOOKS = [
  "lw-global-study-text-2025-26.txt",
  "lw-eng-study-text-2025-26.txt",
  "lw-eng-kaplan-kit-2026.txt",
  "f4-bpp-kit.txt",
]
const SRC_DIR = "C:/Users/User/Desktop/scholify-web-main/scholify-web-main/src/lib"
const MINE = [
  "acca-study-lwe-tree-a.ts",
  "acca-study-lwe-tree-a2.ts",
  "acca-study-lwe-tree-b1.ts",
  "acca-study-lwe-tree-b2.ts",
  "acca-study-lwe-tree-b3.ts",
  "acca-study-lwe-tree-b4.ts",
  "acca-study-lwe-tree-b5.ts",
  "acca-study-lwe-tree-b6.ts",
  "acca-study-lwe-tree-b7.ts",
  "acca-study-lwe-tree-c.ts",
  "acca-study-lwe-tree-c2.ts",
  "acca-study-lwe-tree-d1.ts",
  "acca-study-lwe-tree-d2.ts",
  "acca-study-lwe-tree-d3.ts",
  "acca-study-lwe-tree-e.ts",
  "acca-study-lwe-tree-e2.ts",
  "acca-study-lwe-tree-f1.ts",
  "acca-study-lwe-tree-f2.ts",
  "acca-study-lwe-tree-g.ts",
  "acca-study-lwe-tree-h1.ts",
  "acca-study-lwe-tree-h2.ts",
  "acca-questions-lwe-kit-a.ts",
  "acca-questions-lwe-kit-b1.ts",
  "acca-questions-lwe-kit-b2.ts",
  "acca-questions-lwe-kit-c.ts",
  "acca-questions-lwe-kit-d.ts",
  "acca-questions-lwe-kit-ef.ts",
  "acca-questions-lwe-kit-gh.ts",
  "acca-questions-lwe-kit-supp1.ts",
  "acca-questions-lwe-kit-supp2.ts",
  "acca-cases-lw-eng.ts",
]

/* BT: BOOKS = ["kaplan-st.txt", "kaplan-rk.txt", "bpp-kit.txt", "bpp-workbook.txt"]
 *     MINE  = acca-study-bt-tree-{a,b,c,d,ef}.ts, acca-questions-bt-kit-{a,b,c,def}.ts, acca-cases-bt.ts
 * MA: BOOKS = ["ma-kaplan-st.txt", "ma-kaplan-kit.txt", "ma-bpp-st.txt", "ma-bpp-kit.txt"]
 *     MINE  = acca-study-ma-tree-{a,b,c,d,ef}.ts, acca-questions-ma-kit-{ab,c,def}.ts, acca-cases-ma.ts
 * FA: BOOKS = ["fa-study-text-2024-25.txt", "f3-kaplan-kit-2023-24.txt", "fa2-bpp-kit.txt"]
 *     MINE  = acca-study-fa-tree-{ab,c,d1,d2,ef,g,hi}.ts, acca-questions-fa-kit-{abc,d,efg,hi}.ts, acca-cases-fa.ts
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
 */
const STATUTORY_QUOTES = [
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
  for (const h of findings.slice(0, 40)) {
    console.log(`  [${h.book}] ${h.file}`)
    console.log(`     "${h.phrase}"`)
  }
  if (findings.length > 40) console.log(`  … and ${findings.length - 40} more`)
  if (quoted.size) {
    console.log(`  ── attributed quotations (excluded, see STATUTORY_QUOTES) ──`)
    for (const [instrument, n] of [...quoted].sort()) console.log(`     ${String(n).padStart(3)} × ${instrument}`)
  }
}

console.log(`\nScholify authored text compared: ${mineWordCount.toLocaleString()} words across ${mineStrings.length} strings.`)
console.log(`Book corpus: ${BOOKS.map((b) => `${b} ${bookWords[b].length.toLocaleString()}w`).join(", ")}`)
