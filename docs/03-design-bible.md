# Scholify — UI/UX Design Bible

**Version 1.1 · 2026-07-09** *(1.1 adds §0 Brand identity from the approved brand board)*

The single source of truth for how Scholify looks, moves and speaks. Everything here is extracted verbatim from the shipped foundation — `src/components/acca/ui.tsx` (tokens + primitives), `src/components/acca/charts.tsx` (metrics layer), `src/index.css` (CSS tokens) — and from the reference screens (`Dashboard.tsx`, `AccaAnalytics.tsx`, `AccaStudy.tsx`). **Build every app screen from these pieces. Do not hand-roll cards, buttons, bars, rings or icons.**

---

## 0. Brand identity (the mark & wordmark)

Source: the approved brand board (`Desktop\Scholify\Scholify logo design brief`), implemented 2026-07-09 in `src/components/brand.tsx` + `public/logo.svg`.

### 0.1 The mark — hexagonal circuit of waypoints

Six rotational circuit traces close into a hexagon — each terminal a node, each turn a waypoint on the journey to graduation. It is the Loop, drawn. Geometry (viewBox `0 0 200 200`): **one arm** — node `circle(71,46,r5.5)`, trace `M79,46 L123,46 L133,63`, inner dash `M89,57 L114,57`, terminal `circle(133,63,r4)` — stroked at **7 (3.5% of width), round caps**, rotated **6 × 60°** around (100,100). Fill/stroke **MONO / DEEP RED `#C80000`**.

**Variants** (all in `ScholifyMark`'s `variant` prop): **`red` (MONO / DEEP RED) — the PRIMARY variant, founder decision 2026-07-09; the component default and `public/logo.svg`**; `gradient` (Deep Red → Magenta `#E50068`, special surfaces only); `ink` (`#14141A`); `white` (knockout on dark). The wordmark's i-dot node is solid `#C80000` to match. **Minimums:** 48px print · 24px UI · **16px absolute floor**. **Clear space:** one node diameter on every side.

### 0.2 The wordmark

"Scholify" in **Plus Jakarta Sans Bold (700), −2% tracking**, ink `#14141A`. Signature glyph: **the dot of the "i" is a gradient circuit node** (implemented in `ScholifyWordmark` as dotless ı + positioned gradient dot). Tagline: *"Learn Daily, Grow Steadily"* — uppercase, +28% tracking, 55% ink; brand-asset use only, not app chrome.

### 0.3 Usage in code

- `ScholifyMark({size, variant})` — the icon alone (auth panels, avatars, favicons).
- `ScholifyLockup({size, color, wordmark})` — mark + wordmark, gap = 0.34 × size (nav bars, footers). Used by Landing nav, app sidebar (`dashboard-layout Brand`), Pricing top bar.
- `public/logo.svg` — the master vector (also the SVG favicon). Raster icons (`favicon.png` 48, `icon-192/512.png` on off-white rounded squares) regenerate via `node scripts/make-brand-icons.mjs`.
- The legacy `✦` glyph is retired from brand positions (still fine as a decorative sparkle inside copy).

### 0.4 Misuse (never)

Don't stretch or distort · don't recolor off-brand · don't add shadows or 3D · don't place on low contrast · don't render below 16px · don't rebuild the mark by hand — import it.

### 0.5 Palette (print/CMYK reference)

| Name | HEX | RGB | CMYK |
|---|---|---|---|
| Deep Red | `#C80000` | 200 0 0 | 0 100 100 22 |
| Magenta | `#E50068` | 229 0 104 | 0 100 55 10 |
| Amber | `#F4A405` | 244 164 5 | 0 33 98 4 |
| Ink | `#14141A` | 20 20 26 | 23 23 0 90 |
| Off-White | `#FAFAF7` | 250 250 247 | 0 0 1 2 |

---

## 1. Brand & principles

### 1.1 The look

**Light, warm-paper, coach-like.** The app default is the light theme: soft cream surfaces (`#F7F3F1`) with white cards and warm-brown ink (`#332B28`). Accents are the **ACCA brand family** — red `#C80000` anchoring a gradient through magenta `#E50068` to amber `#F4A405`. Dark mode exists as a Settings toggle (`html[data-theme="dark"]`), which is why *all colors must go through tokens* — hardcoded hexes break the dark theme.

### 1.2 Principles

1. **One system.** Every screen is assembled from `ui.tsx` primitives and `charts.tsx` metrics so the whole app reads as one professional product. If a screen needs a new pattern, add it to the foundation, then use it.
2. **The number is the hero.** Screens are built around one big evidence-tied number (pass probability, days to exam, streak). Everything else supports it.
3. **Coach, never judge.** Supportive, specific, evidence-tied copy. The banned phrase is "you failed"; the house phrase is *"you now know exactly where the marks were lost."*
4. **Honest empty states.** A metric with no data says what starts it measuring ("Sit two timed mocks and the trend… draws itself") — never fake data, never a bare dash.
5. **Calm motion.** Movement confirms and orients; it never decorates for its own sake, never shifts layout, and always respects reduced-motion.
6. **No emoji as icons.** Lucide icons through the semantic `Icon` layer, everywhere (§3).

---

## 2. Design tokens (verbatim)

### 2.1 CSS surface tokens — `--sch-*` (`src/index.css`)

Light (default, and `html[data-theme="light"]`):

```css
--sch-bg:        #f7f3f1;                      /* page background — warm paper */
--sch-bg-2:      #ffffff;
--sch-bg-grad:   linear-gradient(140deg, #fcebe7, #f7f3f1 55%);
--sch-bg-blur:   rgba(247,243,241,0.85);        /* sticky-header backdrop */
--sch-card:      #ffffff;                       /* card surface */
--sch-card-2:    #f7f3f1;                       /* inset surface: tracks, chips, wells */
--sch-hairline:  rgba(51,43,40,0.06);
--sch-border:    rgba(51,43,40,0.08);
--sch-border-2:  rgba(51,43,40,0.14);
--sch-text:      #332b28;                       /* primary ink (warm brown) */
--sch-tx-1:      #5c4f4a;   /* muted   */
--sch-tx-2:      #8e817b;   /* soft    */
--sch-tx-3:      #a1948d;   /* faint   */
--sch-tx-4:      #b9aca5;   /* ghost   */
--sch-font:      "Plus Jakarta Sans", "Geist", ui-sans-serif, system-ui, sans-serif;
```

Dark (`html[data-theme="dark"]`) swaps every token (bg `#050508`, cards `rgba(255,255,255,0.03)`, ink `#f0eeff`…). **Rule: never read a raw hex for a surface or text color — always the token**, via the `C` map below.

### 2.2 Semantic color map — `C` (`ui.tsx`)

```ts
export const C = {
  text: "var(--sch-text)",   muted: "var(--sch-tx-1)",
  soft: "var(--sch-tx-2)",   faint: "var(--sch-tx-3)",
  card: "var(--sch-card)",   card2: "var(--sch-card-2)",
  bg: "var(--sch-bg)",       border: "var(--sch-border)",
  hairline: "var(--sch-hairline)",
  brand:     "#C80000",  brandSoft: "rgba(200,0,0,0.08)",  brandLine: "rgba(200,0,0,0.22)",
  green:     "#0E9F6E",  greenSoft: "rgba(14,159,110,0.10)",
  amber:     "#C2740B",  amberSoft: "rgba(194,116,11,0.10)",
  red:       "#DC2626",  redSoft:   "rgba(220,38,38,0.08)",
}
```

**Usage rules:**
- `C.text` headlines and values · `C.muted` body · `C.soft` secondary · `C.faint` labels/hints. Don't skip rungs for emphasis — use weight instead.
- `C.brand` = identity and interaction (active states, links, icon accents). It is **not** a status color.
- `C.green / C.amber / C.red` = **status only**: good / at-risk / behind vs a pass line or target (§5). Their `*Soft` twins are the only permissible tinted backgrounds for status chips and badges.
- `C.card2` is the well: bar tracks, inset chips, disabled fills.

### 2.3 The gradient

```ts
export const GRAD = "linear-gradient(135deg,#C80000 0%,#E50068 48%,#F4A405 100%)"
// Same ramp as IRIDESCENT (auth-ui.tsx) and .grad-hero / .grad-hero-text (index.css)
```

One gradient, three uses: **primary buttons/CTAs**, **active tab/nav pills**, and **gradient-clipped headline words** (`iriText` in `dashboard-layout.tsx` — background-clip: text). **One gradient CTA per screen** (the Dashboard's "Start now" rule). Never use the gradient on body text or data marks.

Landing-only raw tokens also live in `index.css` (`--brand-500: #C80000`, `--plum-500: #E50068`, `--fire-500: #F4A405`, `--shield-500: #2DD4BF`, paper `--bg-primary: #FAFAF7`) — the landing does not use `--sch-*`.

### 2.4 Spacing — `SP` (4px grid)

```ts
export const SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, "2xl": 24, "3xl": 32, "4xl": 40 }
```

Card padding defaults to `SP.xl` (20). Grid gaps: `SP.md` (12) between cards, `SP.sm` (8) between rows inside a card. Never invent off-grid values.

### 2.5 Radii — `R`

```ts
export const R = { sm: 10, md: 12, lg: 14, xl: 16, "2xl": 20, pill: 999 }
```

Cards `R["2xl"]` (20) · buttons `R.lg` (14) · tiles/inputs `R.md` (12) · chips & meters `R.pill`.

### 2.6 Elevation — `SHADOW` (warm-tinted, three steps + brand)

```ts
sm: "0 1px 2px rgba(51,43,40,0.04), 0 1px 3px rgba(51,43,40,0.06)"   // resting cards
md: "0 2px 6px rgba(51,43,40,0.05), 0 8px 24px rgba(51,43,40,0.06)"  // hover / tooltips
lg: "0 8px 20px rgba(51,43,40,0.08), 0 20px 48px rgba(51,43,40,0.10)" // modals
brand: "0 8px 24px rgba(200,0,0,0.22)"                                // primary CTAs only
```

Shadows are tinted with the ink color (51,43,40), never black. `SHADOW.brand` marks *the* action on screen.

### 2.7 Type scale — `TYPE`

```ts
h1:    { fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }
h2:    { fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.25 }
h3:    { fontSize: 16, fontWeight: 750, lineHeight: 1.3 }
body:  { fontSize: 14, fontWeight: 450, lineHeight: 1.55 }
small: { fontSize: 12.5, fontWeight: 500, lineHeight: 1.5 }
label: { fontSize: 11.5, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }
```

Page titles in practice run 26–27px/800 with `-0.02em`. Hero stat numbers: 27–30px/800 in tiles, up to 42–44px on the countdown card, always with a smaller `C.soft` unit suffix inline. `TYPE.label` + `C.faint` is the universal section/card label. App font is Plus Jakarta Sans (`--sch-font`); the landing uses Instrument Serif display + Geist.

---

## 3. Iconography

### 3.1 The rule

**No emoji as icons — anywhere in the app.** All iconography is Lucide, accessed only through the semantic layer so names describe *meaning*, not glyphs. (Legacy `emoji` fields still exist on some data objects, e.g. `JourneyStage.emoji`; renderers map keys to Lucide via `LOOP_ICONS` / `STAGE_ICON` and must never print the emoji.)

### 3.2 The `ICONS` map (`ui.tsx`) — the complete vocabulary

| Name | Lucide | Meaning |
|---|---|---|
| `study` | GraduationCap | the app / onboarding |
| `progress` | TrendingUp | progress & momentum |
| `settings` | Settings | settings |
| `diagnostic` | Target | diagnostic / pass probability |
| `mock` | Timer | timed mocks / pace |
| `flashcards` | Brain | flashcards / revision / Learning tab |
| `learn` | BookOpen | learn / practice content |
| `generate` | FlaskConical | custom AI practice |
| `tutor` | Sparkles | Charles AI |
| `streak` | Flame | streaks |
| `trophy` | Trophy | achievement / qualification |
| `loop` | RotateCw | the journey loop / retry |
| `lock` | Lock | gated / locked |
| `done` | CheckCircle2 | complete / correct |
| `check` | ClipboardCheck | knowledge check |
| `calendar` | CalendarDays | dates / countdown |
| `shield` | ShieldCheck | shield time / EPSM / notices |
| `examiner` | PenLine | AI Examiner / written |
| `topics` | Layers | topics / syllabus areas |
| `exam` | Landmark | the real ACCA exam |
| `reflect` | Stethoscope | post-mortem / recovery |
| `support` | HeartHandshake | emotional support / referrals |
| `celebrate` | PartyPopper | pass / celebration |
| `arrow` | ArrowRight | forward CTA (rotate 180° for back) |
| `chevron` | ChevronRight | row affordance |
| `practice` | Pencil | practice questions |
| `weak` | Dumbbell | weak-area drills |
| `roadmap` | Map | roadmap / PER |
| `mission` | Zap | today's mission |
| `stats` | BarChart3 | analytics / measuring |
| `rocket` | Rocket | velocity / "fastest path" |
| `gem` | Gem | premium |

### 3.3 Components

- `<Icon name size=18 color="currentColor" strokeWidth={2} />` — always `aria-hidden`, `flexShrink: 0`. Label icons run 13–14px with `strokeWidth 2.3–2.4`; row icons 16–18px.
- `<IconBadge name tone size=40 />` — the tinted-square tile motif (`R.md`, soft tone background, icon at 50% of size). Tones: `brand | green | amber | neutral`. Use it as the leading marker on tiles, flows and celebration screens; use bare `Icon` inline with text.

New concepts get a new semantic name added to the map — never an inline Lucide import in a screen file.

---

## 4. Component library

### 4.1 Primitives (`ui.tsx`)

| Component | Contract | Use when |
|---|---|---|
| **`Card`** | white surface, `1px C.border`, `R["2xl"]`, `padding SP.xl`, `SHADOW.sm`. `interactive` adds hover lift (`y: -2`, `SHADOW.md`) + press (`scale 0.99`) + pointer cursor. Motion-enabled (`HTMLMotionProps<"div">`). | Every content block. Never restyle a raw div into a card. |
| **`SectionLabel`** | `TYPE.label` + `C.faint`, `marginBottom SP.md`. | Kicker above a page title. |
| **`SectionHead`** | uppercase label with optional leading 14px brand icon and a `right` slot (counts, "view all" links). | Every section heading inside pages ("Progress check", "Exam room"). |
| **`Badge`** | pill, 10.5px/800, tones `brand·green·amber·neutral` with soft backgrounds. | Status chips: "PRO", "UNLOCKS AT 60%", "PROVEN AGAIN", "spaced review". |
| **`Button`** | *the one button.* Variants `primary` (GRAD + white + `SHADOW.brand`), `secondary` (card + border), `ghost` (transparent, `C.muted`). Sizes md/lg; `full`; **minHeight 44px**; disabled = `C.card2`/`C.faint`, no shadow; hover transitions background/border/color only — **no layout shift**; `whileTap scale 0.98`; real focus ring via global `:focus-visible`. | Every button. Custom-styled `<button>`s are legacy — do not add more. |
| **`Stat`** | centered compact metric: 22px/800 value (brand-colorable via `accent`) over a `TYPE.small` faint label, on a bordered `R.xl` card. | Simple stat rows where `StatCard`'s delta/spark features aren't needed. |
| **`IconBadge`** | see §3.3. | Tile/list leading markers. |

### 4.2 Metrics layer (`charts.tsx`) — never hand-roll bars or rings

| Component | What it is | Key props / behaviour |
|---|---|---|
| **`StatCard`** | The KPI tile: icon + uppercase label · 27px value (+15px `C.soft` suffix) · optional `DeltaChip` · optional 14-day `Sparkbars` · optional footnote. Staggers in by `index` (0.06s steps). | `label, value, suffix, icon, delta, deltaSuffix, deltaVs, upIsGood, spark, sparkUnit, footnote, index` |
| **`RingGauge`** | Animated donut with count-up centre number, colored status label under it, muted sublabel, and an optional **target tick** (the pass line) drawn as a 2px ink mark at the target angle. Fill color defaults to `bandColor(value, target ?? 60)`. Track is `C.card2`. Rounded stroke ends; 1.1s ease-out draw; centre number uses `useCountUp`. | `value (0–100), size=180, stroke=13, color, label, sublabel, target, suffix="%"` |
| **`MeterBar`** | Thin labeled progress bar, `R.pill`, animated width (0.8s ease-out), optional target tick (2px, ink at 40% opacity). Track defaults `C.card2`; pass a same-ramp soft (`C.brandSoft`, `C.greenSoft`) for tinted meters. | `value, max=100, color=C.brand, track, height=8, target, delay` |
| **`BreakdownList` / `BreakdownRow`** | Per-category rows: 26px code chip (`C.card2`) · truncating label · 84px `MeterBar` colored by `bandColor(pct, passLine)` with the pass-line tick · right-aligned 44px tabular value (`valueText` or `pct%`). Rows stagger by 0.06s. | `items[{code,label,pct,valueText}], passLine=60, barWidth` |
| **`TrendBars`** | Dated attempt history (mocks) as bars vs a horizontal pass-line rule; bars colored by `bandColor`; hover dims siblings to 0.45 and shows an ink tooltip (`value% · unit · Thu 3 Jul`); footer prints first date and "pass line X%". | `points[{date,percent}], passLine=60, height=72, unit` |
| **`Sparkbars`** | Mini daily bar chart: 2px gaps, 3–10px bars, `3px 3px 0 0` top radius, latest bar full brand, history `rgba(200,0,0,0.18)`, zero days 3px `C.card2` stubs; pointer tooltip; `role="img"` with aria-label. | `data[{date,count}], height=38, color, restColor, unit` |
| **`DeltaChip`** | Signed change pill vs a named period: triangle glyph + `+N%` + faint "last week". Green when good, red when bad (`upIsGood` flips polarity), neutral grey at zero. | `delta, suffix="%", vs="last week", upIsGood` |
| **`useCountUp`** | rAF count-up for headline numbers (1100ms, cubic ease-out) "so the reveal feels earned". | `(target, run, ms)` |
| **`bandColor` / `bandSoft`** | The status formula — see §5.1. | `(pct, passLine=60)` |

**Composition patterns from the shipped screens:** hero = `Card` with `RingGauge` left + explanation/`MeterBar` right; KPI rows = CSS grid `repeat(auto-fit, minmax(240px, 1fr))` of `Card`s or `minmax(150–170px,1fr)` of `StatCard`s; the one intentionally dark element is the **exam-countdown card** (`linear-gradient(135deg, #1c0f10, #3a0d16 60%, #55102a)`, white text, amber `#F4A405` phase accent) — reserve dark surfaces for that single dramatic moment per screen.

---

## 5. Data-viz rules (baked into `charts.tsx` — keep them)

1. **Values are always visible as text.** Color is never the only channel — every bar/ring carries its number (tabular-nums when columnar).
2. **Status colors mean something.** Green/amber/red *only* where the number means good/at-risk/behind vs a pass line or target:
   ```ts
   bandColor(pct, passLine = 60): pct >= passLine → C.green
                                  pct >= passLine - 15 → C.amber
                                  else → C.red
   ```
   Non-status quantities (volume, activity) use the brand ramp or neutrals.
3. **Targets are drawn, not implied.** Rings and meters carry a physical target tick; trend charts draw the pass-line rule and *name it in text* ("pass line 50%").
4. **Thin marks, rounded data ends.** Meters 6–9px, `R.pill`; bars with rounded tops (3–4px); 2px surface gaps between bars; ring stroke 9–14 with `strokeLinecap="round"`.
5. **One hero number per view.** Each card leads with a single big value; support values shrink and grey (`C.soft` suffixes).
6. **Text wears text tokens.** Labels/values stay in ink colors — the colored mark *beside* the text carries state (BreakdownRow's value is `C.muted`, its bar is banded).
7. **Single-hue ramps for intensity.** Heatmaps use one red ramp — knowledge map `rgba(200,0,0, 0.12 + 0.78·m)`, activity map `rgba(200,0,0, 0.25 + 0.65·norm)` — with `C.card2` for zero/never and a drawn legend ("less ▪▪▪▪ mastery").
8. **Tooltips are ink.** `C.text` background, card-color text, `R.sm`, `SHADOW.md`, 11px, non-interactive (`pointerEvents: none`).
9. **Empty states teach.** Use the `Measuring` pattern (inset `C.card2` row + `stats` icon) naming the action that starts the data — never render an empty chart.

---

## 6. Motion rules

Presets (`MOTION` in `ui.tsx`) — the house easing is `[0.22, 1, 0.36, 1]`:

```ts
rise:  { initial: {opacity: 0, y: 10}, animate: {opacity: 1, y: 0},
         exit: {opacity: 0, y: -8}, transition: {duration: 0.28, ease: [0.22,1,0.36,1]} }
item(i): { initial: {opacity: 0, y: 8}, animate: {opacity: 1, y: 0},
           transition: {duration: 0.3, delay: i * 0.05, ease: [0.22,1,0.36,1]} }
press: { whileTap: { scale: 0.99 } }
```

Rules, as practiced across the screens:

1. **Enter:** pages/sections `rise`; list rows `item(i)` (or x: −8..−14 slide-ins for step lists) with 0.04–0.08s stagger. Mode switches use `AnimatePresence mode="wait"`.
2. **Hover never shifts layout.** Cards/tiles lift `y: -2` + shadow step; buttons change color/shadow only. No scale-on-hover in the app (scale is reserved for `whileTap` 0.98–0.99).
3. **Data draws itself:** rings 1.1s, meters 0.8s, bars 0.5–0.6s with per-item delay; numbers count up (`useCountUp`). Draw once on mount — don't re-animate on every re-render.
4. **Ambient motion is rare and meaningful:** the current journey node breathes (`scale [1,1.1,1]`, 2s loop), the loop icon rotates (9s linear), the exam-day badge waves, "Charles is thinking" pulses opacity. Maximum one ambient element per screen.
5. **Reduced-motion safety is global:** `@media (prefers-reduced-motion: reduce)` in `index.css` zeroes all animation/transition durations app-wide; landing tilt also checks `useReducedMotion()`.
6. **3D tilt is landing-only and fine-pointer-only** (`useTilt` in `landing-3d.tsx`): max 9°, spring stiffness 140/damping 18, disabled for `(pointer: coarse)` and reduced-motion — "on touch, tracking pointermove fights the thumb."
7. **Tab indicators glide:** active pills use `layoutId` shared-layout springs (stiffness 400, damping 34), e.g. the analytics tabs and billing toggle.
8. **Celebration:** `canvas-confetti` in brand colors `["#C80000","#E50068","#F4A405","#10B981"]`, three staggered bursts — used only for a passed real exam.

Ship every UI change with its motion. A new list without stagger, or a new meter that pops to full width, is unfinished work.

---

## 7. Layout system

- **Content max-widths:** `/study` 760px · `/dashboard` and `/study/analytics` 820px · diagnostic 640px · onboarding wizard 560px; all `margin: 0 auto` with bottom padding 40–60px inside `DashboardLayout` (sidebar on desktop, tab bar on mobile).
- **Card grids:** `display: grid; gridTemplateColumns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12` (the `grid2` pattern) for metric cards; `minmax(150–170px, 1fr)` for compact stat tiles; `minmax(96px, 1fr)` for heatmap tiles; `minmax(280px, 1fr)` for the dashboard hero pair. Auto-fit does the responsive work — avoid media-query column counts.
- **Rows:** flex, `alignItems: center`, gap 12–14; leading `IconBadge`, `flex: 1; minWidth: 0` middle (truncate with ellipsis), fixed-width right-aligned values, trailing `chevron`.
- **Mobile ≤ 640px:** tab labels collapse to icons (`max-sm:hidden` on the analytics tabs); horizontal strips (LoopStrip) scroll with `overflowX: auto`; wide tables get an `overflow-x: auto` wrapper (Pricing comparison, `minWidth: 560`); touch targets stay ≥ 44px; `whileHover` transforms are disabled on `(hover: none)`.
- **Full-bleed action bars:** session/quiz primary actions are full-width buttons pinned below the card, `padding: 16`, `R.lg`.
- **Dark accents:** at most one dark gradient card per screen (countdown). Everything else stays on paper.

---

## 8. Voice & copy guide

### 8.1 Tone

Charles is an **AI race engineer with receipts**: warm, direct, always tying claims to the learner's own numbers, in an F1 pit-wall voice (laps, race plan, the sitting is race day). First person from Charles ("I keep adjusting your race plan at your weak topics"), second person for the student. *(Renamed from "Lara" — founder decision; Charles + race-engineer voice is canonical across app and landing.)*

### 8.2 House rules

1. **Evidence-tied headlines.** Every big claim quotes the number: "You're at 43% to pass FR. Finish today's plan to push it higher." · "7 points above the line and climbing." · "Get D and E up to 70% and your pass chance rises from 68% to 85%."
2. **Recovery language — never "failed."** Canon: *"Not this time"* (button), *"You now know exactly where the marks were lost — close those gaps, then prove it with a fresh mock,"* *"A failed sitting is an event, not a verdict,"* *"This one stung. Let it."* Emotional support comes **before** any analysis in the reflection flow. Dips are normalised: "Dipped — normal while drilling new weak areas."
3. **The plan removes choice.** "TODAY'S PLAN · THE PLAN ALREADY CHOSE FOR YOU", "one plan a day, no choosing", numbered ①②③.
4. **Labels are uppercase, sentences are sentence case.** `TYPE.label` (11.5px/800/0.06em) for section labels and kickers ("PASS-PROBABILITY DIAGNOSTIC", "WHERE THE MARKS WENT"); everything else sentence case. Never title-case body copy.
5. **Numbers speak with units attached** as smaller `C.soft` suffixes ("18 *days*", "62 *% probability*", "45s *avg / question · budget 90s*").
6. **Honest uncertainty.** Coverage caveats ("Based on 16 questions covering 80% of the syllabus areas"), fallback labels ("Demo marking — no live AI key connected"), and "Measuring" empty states that name the unlocking action.
7. **Time promises are concrete:** "~15 min", "~25 min", "sit the next one in 2–3 days."
8. **Trademark hygiene:** "Scholify is independent and not affiliated with ACCA" wherever ACCA content is referenced; questions are "original and syllabus-aligned."

### 8.3 Microcopy patterns

- Gates: state the number and the path — "The mock room unlocks at 60% pass probability — you're at 41%. Today's plan is aimed at getting you there."
- Success: earned, not gushing — "That's a 67% pass on Financial Reporting." / "Every mission, every mock, every flashcard — it all just paid off."
- Streak-safe nudges: "Come back tomorrow to keep the streak alive."
- Buttons are verbs with direction: "Start closing the gap", "Save my mark — show me the way back", "Rebuild my roadmap — back into the loop".

---

## 9. Landing-specific rules

1. **The design is pinned.** The landing layout, section structure and visual system are approved and frozen — changes are **additive only** (new sections/copy slots), never restructuring, without an explicit decision.
2. **Separate token set.** The landing runs on the raw `index.css` tokens (`--bg-primary: #FAFAF7`, `--ink-primary: #14141A`, brand/plum/fire/shield families) and its own fonts (Instrument Serif display, Geist sans, Geist Mono, Caveat handwritten) — it does **not** consume `--sch-*` and does not theme dark.
3. **EN/RU parity is mandatory.** Every user-visible landing string goes through `t()` (`LanguageProvider`); a new English string ships with its Russian twin in `src/i18n/translations.ts` in the same PR. **ACCA paper names, codes and syllabus labels stay English in both languages.** The app past sign-in remains English-only by design.
4. **Signature effects stay landing-only:** mesh background (`.mesh-bg`), rotating conic borders (`.animated-border`), glass pills, marquee masks, auto-scrolling testimonials (pause on hover), ROI sliders, 3D tilt (§6.6). None of these migrate into the app shell.
5. **Same accessibility bar:** reduced-motion kills the mesh/border/testimonial animations; tilt off for coarse pointers; brand-red focus rings; scroll-behavior smooth only when motion is allowed.
6. **Copy discipline:** ACCA exam-prep positioning (pass probability, AI Examiner, the loop), the pricing hook "Cheaper than one tutoring hour.", and the independence disclaimer near ACCA references.

---

## 10. Checklist for any new screen or component

- [ ] Built from `ui.tsx` primitives + `charts.tsx` metrics — no hand-rolled cards/buttons/bars/rings.
- [ ] Colors via `C` / `--sch-*`; status colors only against a real pass line via `bandColor`.
- [ ] Spacing on the `SP` grid; radii from `R`; shadows from `SHADOW`.
- [ ] Icons via `Icon`/`IconBadge` semantic names; zero emoji-as-icons.
- [ ] One hero number; values as text; targets drawn and named.
- [ ] `rise` on entry, `item(i)` stagger on lists, tap feedback, no hover layout shift, reduced-motion safe.
- [ ] Honest empty/measuring state; fallback labels for keyless AI.
- [ ] 44px touch targets; truncation with `minWidth: 0`; auto-fit grids; wide content scrolls in its own container.
- [ ] Copy: evidence-tied, sentence case, uppercase labels, recovery language — never "you failed."

*Companion document: `docs/02-product-requirements.md` — what these components are assembled into.*
