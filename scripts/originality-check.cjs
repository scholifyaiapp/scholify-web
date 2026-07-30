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
 * ── One documented exception, and why ─────────────────────────────
 * FA cannot reach zero at 10 words, because the OFFICIAL NAME of one of the
 * statements it teaches — "the statement of profit or loss and other comprehensive
 * income" — is itself ten words long. Two strings in the FA tree are that name and
 * nothing else: a section heading and one multiple-choice option. It is an IFRS term
 * of art and rewording it would make the content wrong, so both are left alone.
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
 * Current setting: FA (the third paper rebuilt). BT's and MA's settings are kept
 * below in comments so an earlier paper can be re-checked without rediscovering the
 * file names.
 */
const BOOKS = ["fa-study-text-2024-25.txt", "f3-kaplan-kit-2023-24.txt", "fa2-bpp-kit.txt"]
const SRC_DIR = "C:/Users/User/Desktop/scholify-web-main/scholify-web-main/src/lib"
const MINE = [
  "acca-study-fa-tree-ab.ts",
  "acca-study-fa-tree-c.ts",
  "acca-study-fa-tree-d1.ts",
  "acca-study-fa-tree-d2.ts",
  "acca-study-fa-tree-ef.ts",
  "acca-study-fa-tree-g.ts",
  "acca-study-fa-tree-hi.ts",
  "acca-questions-fa-kit-abc.ts",
  "acca-questions-fa-kit-d.ts",
  "acca-questions-fa-kit-efg.ts",
  "acca-questions-fa-kit-hi.ts",
  "acca-cases-fa.ts",
]

/* BT: BOOKS = ["kaplan-st.txt", "kaplan-rk.txt", "bpp-kit.txt", "bpp-workbook.txt"]
 *     MINE  = acca-study-bt-tree-{a,b,c,d,ef}.ts, acca-questions-bt-kit-{a,b,c,def}.ts, acca-cases-bt.ts
 * MA: BOOKS = ["ma-kaplan-st.txt", "ma-kaplan-kit.txt", "ma-bpp-st.txt", "ma-bpp-kit.txt"]
 *     MINE  = acca-study-ma-tree-{a,b,c,d,ef}.ts, acca-questions-ma-kit-{ab,c,def}.ts, acca-cases-ma.ts
 */

const words = (s) =>
  s
    .replace(/[\u2018\u2019\u201c\u201d]/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)

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
  console.log(`\n=== ${N}-word windows === ${unique.length} distinct match(es)`)
  for (const h of unique.slice(0, 25)) {
    console.log(`  [${h.book}] ${h.file}`)
    console.log(`     "${h.phrase}"`)
  }
  if (unique.length > 25) console.log(`  … and ${unique.length - 25} more`)
}

console.log(`\nScholify authored text compared: ${mineWordCount.toLocaleString()} words across ${mineStrings.length} strings.`)
console.log(`Book corpus: ${BOOKS.map((b) => `${b} ${bookWords[b].length.toLocaleString()}w`).join(", ")}`)
