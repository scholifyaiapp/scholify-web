# Scholify · Design upgrade prompts

Ready-to-paste prompts for redesigning internal app surfaces with Claude.
Each session: paste the **master prompt** first, then ONE surface prompt.
One surface per session — small, reviewable, shippable.

---

## THE MASTER PROMPT (paste this first, always)

```
You are redesigning one surface of Scholify, a launched ACCA exam-prep web app
(React + Vite + TypeScript, inline styles, framer-motion via "motion/react").
Real students use this daily. This is a REFINEMENT of a working product, not a
reinvention — the app already has a design system and the new surfaces (Mock
Centre, Today board) show the target quality. Bring the surface I name up to
that standard.

## The design language (never deviate)

- Tokens live in src/components/acca/ui.tsx and are the ONLY source of visual
  values: C (colors), SP (4px spacing grid), R (radii), SHADOW (3-step warm
  elevation), TYPE (h1/h2/h3/body/small/label), MOTION (rise/item/press),
  Icon/IconBadge/Card/Button/Badge/BackButton components.
- Colors are THEME VARIABLES: C.text/muted/soft/faint for ink, C.card/card2/bg
  for surfaces, C.border/hairline for lines. NEVER a raw hex for any of these —
  the app has light and dark themes driven by --sch-* CSS vars and a raw hex
  breaks one of them. The only literal colors allowed are the semantic set
  already in C (brand #C80000, green, amber, red + their Soft variants) and the
  IRIDESCENT gradient (import GRAD from ui.tsx) for hero moments only.
- Type: use TYPE.* presets. Numbers that update (scores, counts, percentages,
  clocks) always get fontVariantNumeric: "tabular-nums".
- Icons: Lucide via <Icon name="..."/> ONLY. Never emoji as UI icons. If a
  needed name is missing, add the Lucide icon to the ICONS map in ui.tsx.
- Cards: <Card>, border 1px C.border, R["2xl"], SHADOW.sm at rest. Elevation
  states change shadow/border color, never size or position.

## Motion rules (framer-motion, "motion/react")

- Entrances: MOTION.rise for sections, MOTION.item(i) for staggered lists
  (~50ms stagger, 280-350ms, ease [0.22, 1, 0.36, 1]).
- Every animated component calls useReducedMotion() and passes initial={false}
  (or equivalent) when reduced — this is non-negotiable, the app promises it.
- Animate transform/opacity only. Never width/height/top/left. Hover states
  change shadow/opacity/border — never scale that shifts layout. whileTap scale
  0.99 max.
- One or two animated focal points per view. Charts/gauges may draw in once.

## Quality bar (ship-blocking)

- Contrast: body text >=4.5:1 in BOTH themes. C.faint is for metadata only,
  never for text a learner must read.
- Touch targets >=44px, visible keyboard focus on every interactive element,
  aria-labels on icon-only buttons.
- Every list has a designed EMPTY state (icon, one warm sentence, one action —
  the app's voice is Charles: a calm F1 race engineer, concrete, never scolding,
  never exclamation-mark cheerleading).
- Loading: skeleton or reserved space. Zero layout shift when data lands.
- Responsive from 360px: no horizontal scroll ever; grids use
  repeat(auto-fit, minmax(...)); wide tables scroll inside their own container.
- Dark theme checked explicitly — toggle it, look at every state.

## Working rules

- Read the surface's file(s) fully before editing. Preserve ALL logic, props,
  handlers, analytics events (trackEvent), and test hooks — this is a visual
  refactor, logic changes are out of scope.
- Match the repo's comment style: explain WHY, not what.
- Do not add dependencies. Do not create new global styles. Do not touch
  ui.tsx tokens except to ADD an icon.
- Gates before done: npm run typecheck, npm run lint (0 errors), npm test —
  all green. If the surface has a render test, it must still pass; if it has
  none, add one (jsdom, render both empty and populated states — see
  src/components/acca/student-surfaces.test.tsx for the pattern).
- Push directly to main when green (repo policy, CLAUDE.md).

I will now give you the surface brief.
```

---

## SURFACE 1 · Dashboard (`/dashboard`) — the daily home

```
Surface: src/pages/Dashboard.tsx (~600 lines). The first screen after sign-in;
its job is one decision — "what do I do right now?" — answered in under 3
seconds, then get out of the way.

Upgrade:
1. HIERARCHY. One unmistakable primary action above the fold (today's mission /
   continue studying) styled as the single hero: brand-tinted Card, SHADOW.md,
   the only GRAD accent on the page. Everything else (stats, streak, links)
   visually subordinate — smaller, C.card, SHADOW.sm.
2. THE NUMBERS ROW. Stat tiles equal height, label TYPE.label in C.faint, value
   tabular-nums 22-26px weight 800, one-line footnote TYPE.small. Skeletons
   with identical dimensions while loading — zero shift.
3. STREAK & SHIELD. If streak > 0 show it warm (flame icon, amber family); if
   the learner is returning after missed days, the missed-day note renders as
   reassurance (calm sentence in a soft card), never as a red warning.
4. SCAN RHYTHM. Consistent vertical rhythm: SP.xl between sections, one
   TYPE.label section header each. Remove any double borders (Card inside Card).
5. MOTION. Page uses MOTION.rise; tiles MOTION.item(i) stagger; respect
   reduced motion.

Do not change: routing, data hooks, gate/paywall logic, analytics.
Definition of done: cold load answers "what now?" instantly; empty state (brand
new account) looks intentional; both themes; 360px clean; gates green.
```

---

## SURFACE 2 · Analytics (`/study/analytics`) — the evidence room

```
Surface: src/pages/AccaAnalytics.tsx (~1,300 lines) plus the chart primitives
in src/components/acca/charts.tsx. This page carries the most data in the app;
its failure mode is "wall of equal-weight widgets".

Upgrade:
1. ONE HEADLINE. The Exam Readiness number is the page's h1 moment: RingGauge
   large (160-180px), its band color, one sentence under it saying what would
   move it most. Everything else supports this number.
2. GROUPING. Three labeled bands, in order: "Where you stand" (readiness,
   trend), "Where marks leak" (weak areas, mistake types), "What you've done"
   (volume, activity, sessions). TYPE.label headers, SP["2xl"] between bands.
3. CHARTS. Gridlines C.hairline only; axis text TYPE.small C.faint; every
   series directly labeled (no detached legends); bars/lines >=3:1 contrast
   against C.card; tooltips/tap details for exact values; draw-in once
   (400ms, reduced-motion-safe). Never color as the only encoding — pair with
   text or icon.
4. AREA BARS. Weak-area meters: area code bold + label truncated with
   title=full text, value right-aligned tabular-nums, bandColor fill, a Study
   button per row (>=44px).
5. EMPTY/SPARSE. Under 10 answers: show a designed "still measuring" state
   with answersNeeded progress, not empty charts. Sparse weeks in activity
   render as faint dots, not gaps that look broken.

Do not change: any calculation, stats read, or navigation contract.
Definition of done: a learner can answer "am I ready, what do I fix first?"
from the first screenful; both themes; 360px (charts simplify, never squash);
gates green.
```

---

## SURFACE 3 · Settings (`/settings`) — the control room

```
Surface: src/pages/Settings.tsx (~2,400 lines). Oldest sprawl in the app:
plan, account, billing, paper/variant, study days, notifications, danger zone.
It must feel like a calm control room, not a form dump.

Upgrade:
1. STRUCTURE. Group into titled Card sections with TYPE.h3 headers and one-line
   TYPE.small descriptions: Study plan / Papers & variant / Account / Billing /
   Notifications / Danger zone. Consistent internal padding SP.lg, rows
   separated by C.hairline.
2. ROW GRAMMAR. Every setting is one row: label + current value left, control
   right, >=44px tall. Selects/inputs styled consistently (border C.border,
   R.md, focus ring brand). Section order = frequency of use; Danger zone last,
   visually separated (C.redSoft tint), destructive buttons red + confirm step.
3. FEEDBACK. Every save gives immediate visual confirmation (brief check flash
   or toast, aria-live polite). Disabled controls at 0.5 opacity with cursor
   not-allowed and a reason in TYPE.small.
4. VARIANT & PLAN EDITS. The paper variant switcher and study-days picker are
   the two highest-stakes controls: give each helper text stating the
   consequence ("changes your syllabus and reloads content"), and the study-day
   picker shows derived days/week live.
5. RAW HEX SWEEP. This file carries stray literals (#f3f3f7, #6d5bf5 etc.) —
   replace every one with C tokens; anything without a token match maps to the
   nearest semantic token.

Do not change: any handler, billing call, or entitlement logic.
Definition of done: any setting findable in <5s by scanning section headers;
keyboard-navigable; both themes; gates green.
```

---

## SURFACE 4 · Notes (`/notes`) — the notebook

```
Surface: src/pages/NotesHub.tsx (~300 lines) — the thinnest internal surface,
functional but plain. Every note from chapters, practice and mocks in one
place.

Upgrade:
1. NOTEBOOK FEEL. NoteCards get a subtle paper treatment: source chip (paper
   code + where it was taken, IconBadge), body 14px line-height 1.6 clamped to
   ~6 lines with expand, timeAgo in C.faint, pinned notes with a pin accent and
   sorted first under a "Pinned" TYPE.label.
2. TOOLBAR. Search + paper filter + sort in one sticky row (backdrop-blur,
   C.bg at 90%), pill-style filter (R.pill). Search matches highlight.
3. GRID. Masonry-feel via CSS columns (2 at >=768px, 3 at >=1100px, 1 mobile);
   cards MOTION.item(i) stagger; hover elevates SHADOW.sm→md, no movement.
4. EDITING. Inline edit swaps body for an auto-growing textarea with save/cancel
   Buttons; saving flashes confirmation. Delete confirms.
5. EMPTY STATE. First-run: notebook icon, "Your notebook is empty — highlight
   anything while studying and it lands here", one Button to /study. This page
   is many users' first "it remembers me" moment — make the empty state sell it.

Do not change: note store API (updateNote etc.) or the capture paths.
Definition of done: reads like a notebook, not a list of grey boxes; both
themes; 360px single column clean; gates green; add the missing render test.
```

---

## SURFACE 5 · The study session chrome (`/study` inner views)

```
Surface: src/pages/AccaStudy.tsx (~3,000 lines) routing between TodayBoard,
PracticeHub, StudyChapterReader, FlashcardsView, MockCentre etc. The newer
boards are the app's best design — the CHROME between them is the upgrade:
transitions, headers, and the practice-session question screen.

Upgrade:
1. VIEW TRANSITIONS. Every view swap uses one consistent AnimatePresence
   pattern (MOTION.rise, mode="wait", exit shorter than enter ~180ms). Back
   navigation always lands where the learner left (preserve scroll).
2. SESSION HEADER. During any practice run: one slim sticky header — progress
   ("7 / 12" tabular-nums + thin brand progress bar), area chip, exit that
   confirms when answers exist. No layout shift as numbers tick.
3. QUESTION SCREEN. Options are >=44px rows with R.lg borders; selected state
   brand border + brandSoft fill; correct/incorrect reveal uses green/red
   Soft fills WITH icons (never color alone); explanation slides open without
   pushing the options around (reserve space); "next" is the single primary
   button, Enter-key advances.
4. COMPLETION MOMENTS. Session-complete screens follow one template: RingGauge
   score, one-line verdict in Charles's voice, two actions max (continue /
   review misses). Confetti only on genuine firsts (day complete, first pass) —
   respect reduced motion.
5. CONSISTENCY SWEEP. Same BackButton placement, same TYPE.label section
   headers, same Card usage across all inner views — kill any one-off paddings.

Do not change: session composition, grading, recording, or the runner logic —
visual chrome only.
Definition of done: moving through learn → practice → results feels like ONE
product; no dead-end screens; both themes; gates green.
```

---

## How to run these

1. Open a fresh Claude Code session in the repo.
2. Paste the master prompt, then ONE surface prompt.
3. Review the diff, check both themes at 360px and desktop.
4. Gates green → it pushes to main → Vercel deploys.
5. Next surface, next session.

Order of impact: Dashboard → Study chrome → Analytics → Settings → Notes.
