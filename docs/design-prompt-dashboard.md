# Scholify · Dashboard redesign prompt (laptop + mobile)

Paste the whole block below into a Claude design session. It is self-contained:
the real palette, tokens, content inventory, both layouts, all ten states, and
the gates. Companion to [design-prompts.md](./design-prompts.md) (the master
pack) and the [design bible](./03-design-bible.md).

---

# Redesign the Scholify Dashboard — laptop + mobile

## What you are designing

Scholify is a launched ACCA exam-prep web app. The Dashboard (route `/dashboard`,
file `src/pages/Dashboard.tsx`) is the signed-in daily home for a student
preparing for one accounting exam. Its ONE job: answer **"what do I do right
now?" in under 3 seconds**, then get out of the way. Every element either serves
that answer or supports it quietly.

The app's voice is **Charles** — a calm F1 race engineer. Concrete, warm,
never scolding, never exclamation-mark cheerleading. "You missed 2 days, so I've
re-spread the plan — no backlog." That tone is a design constraint: no red
alarms for missed days, no guilt UI, celebration only for genuine firsts.

This is a REFINEMENT of a working product with a design system, not a
reinvention. Preserve all logic, props, handlers, analytics — visual work only.

## Design system (exact values — never invent your own)

**Font:** "Plus Jakarta Sans", system-ui fallback.

**Themes** (CSS vars, already wired — use tokens, NEVER raw hex for ink/surfaces):

- Light (default): warm cream. bg #f7f3f1, card #ffffff, card2 #f7f3f1,
  text #332b28, muted #5c4f4a, soft #8e817b, faint #a1948d,
  border rgba(51,43,40,.08), hairline rgba(51,43,40,.06),
  page gradient linear-gradient(140deg,#fcebe7,#f7f3f1 55%).
- Dark: near-black. bg #050508, card rgba(255,255,255,.03),
  card2 rgba(255,255,255,.045), text #f0eeff, muted rgba(240,238,255,.72),
  soft rgba(240,238,255,.46), faint rgba(240,238,255,.30),
  border rgba(255,255,255,.08), hairline rgba(255,255,255,.055).
- In code these are the `C` object from `src/components/acca/ui.tsx`
  (C.text/muted/soft/faint/card/card2/bg/border/hairline). Use those tokens.

**Accents (literal, theme-independent):** brand #C80000, brandSoft
rgba(200,0,0,.08), brandLine rgba(200,0,0,.22); green #0E9F6E (+soft);
amber #C2740B (+soft); red #DC2626 (+soft). Hero gradient (use ONCE per page
max): linear-gradient(135deg,#C80000 0%,#E50068 48%,#F4A405 100%).

**Scale:** 4px spacing grid — SP: 4/8/12/16/20/24/32/40. Radii — R: 10/12/14/16/20/pill.
Shadows (warm, 3 steps): sm "0 1px 2px rgba(51,43,40,.04), 0 1px 3px rgba(51,43,40,.06)",
md "0 2px 6px rgba(51,43,40,.05), 0 8px 24px rgba(51,43,40,.06)",
lg for hero moments, brand "0 8px 24px rgba(200,0,0,.22)".

**Type:** h1 26/800/-0.02em · h2 20/800 · h3 16/750 · body 14/450/1.55 ·
small 12.5/500 · label 11.5/800/uppercase/+0.06em. Every live number
(streak, %, counts, countdown) gets font-variant-numeric: tabular-nums.

**Icons:** Lucide only, via the existing `<Icon name="..."/>` component.
NEVER emoji as UI icons. Existing components to reuse: Card, Button, Badge,
IconBadge, RingGauge, MeterBar, bandColor(), CharlesMascot.

**Motion** ("motion/react" = framer-motion): section enter = fade + y:10→0,
280ms, ease [0.22,1,0.36,1]; lists stagger 50ms/item; hover changes
shadow/border only (never position/size); whileTap scale 0.99 max; every
animated element respects useReducedMotion() with initial={false}. Animate
transform/opacity only.

## Content inventory (all of this exists — reorganise, don't remove)

1. **Header row** — greeting("FirstName") in Charles's voice + date; paper chip
   (code, variant label, exam countdown); CharlesMascot (wave, ~52px).
2. **Charles's line** — todayHeadline(): one sentence about today.
3. **Next-action card** — "Your next action · the plan already chose": today's
   blocks from composeToday() with per-block done state, or the completed state
   ("Today's mission is complete. Your streak is secured…").
4. **Readiness card** — RingGauge of passProbability (band-colored), band label,
   momentum, "Full analytics →". If not yet diagnosed: a diagnostic CTA card
   instead (icon, one sentence, one button).
5. **Vitals grid — 4 VitalTiles:** Streak (days + "Secured for today ✓" /
   "Complete one task to secure today"); Today's goal (MeterBar answered/goal);
   Weakest area (area code + MeterBar + Study link); Mock exams (locked shows
   meter toward the 60% gate; unlocked shows best % / "Sit Mock 1" /
   "Exam-ready — keep it warm"; free users see upgrade note).
6. **Plan strip** — LearningDashboard tiles (daily block minutes, phase, etc.)
   + PlanRoute (phase stepper to exam day).
7. **Conditional banners** — recovery "Retake run" (after a failed real exam,
   amber accent, retake countdown); missedDayNote / pausedNote (calm
   reassurance, NEVER red); ExamDayFlow modal when examDayDue.
8. **Footer row** — qualification progress ("X of 13 papers · Y%"), flashcards
   link, upgrade pill (free users), analytics link.

## LAPTOP layout (>=1024px, container max-width ~1080px, side padding 24px)

Two-column grid: **main column ~640px + right rail ~360px**, gap 24px.

- **Row 0 (full width):** header — greeting h1 + date left; paper chip + exam
  countdown right; mascot beside greeting. Any conditional banner (recovery /
  missed-day / paused) directly beneath, full width, one line, soft tint.
- **Main column, top — THE HERO:** the Next-action card. The only card with
  brand tinting (brandSoft wash or 3px brand left border), SHADOW.md, its
  primary block as a large Button. Blocks as a vertical checklist: done items
  get green check + muted text (no shame styling), current item elevated with
  its minutes chip. Completed-day state swaps to the calm "mission complete,
  streak secured" panel — green family.
- **Main column, below hero:** Plan strip (LearningDashboard tiles in a 3-up
  row) then PlanRoute stepper.
- **Right rail, top:** Readiness card — RingGauge 150–160px centered, band
  label under it, momentum line, analytics link. (Diagnostic CTA replaces it
  pre-diagnosis, same slot, same size — no layout jump between states.)
- **Right rail, below:** the 4 VitalTiles stacked 2×2 (each min-height equal,
  label TYPE.label faint, value 22px/800 tabular-nums, one meter or footnote).
- **Footer row (full width):** hairline top border, quiet links + qualification
  progress. Upgrade pill only for free users.

Hierarchy check: squinting at the page, exactly TWO focal points — the
next-action hero and the readiness ring. Everything else recedes.

## MOBILE layout (<=480px, single column, side padding 16px, bottom padding 96px for the tab bar)

Order (most decision-relevant first):

1. Compact header: greeting (h1 clamps to 22px) + mascot 44px right; date and
   paper chip share one 12.5px line under it; exam countdown as a pill chip.
2. Conditional banner (one line, truncates gracefully).
3. **Next-action hero** — full width, the primary block's button full-width,
   >=48px tall. This must be visible without scrolling on a 360×640 screen.
4. Readiness — HORIZONTAL card: RingGauge 96px left, band label + momentum +
   analytics link right. (Not the 160px centered ring — vertical space is rent.)
5. Vitals — 2×2 grid of compact tiles (min 44px touch, value 20px). Tapping a
   tile navigates (streak→today, goal→practice, weakest→study, mock→mock centre).
6. Plan strip tiles horizontal-scroll in their own container (scroll-snap,
   no page horizontal scroll) OR stack 2-up; PlanRoute collapses to
   "Phase 2 of 4 · Skill building" with a thin progress bar.
7. Footer links wrap; qualification progress one line.

Mobile rules: every tap target >=44px; no hover-dependent info (momentum,
tooltips get visible text); meters keep height 7px but hit areas padded;
sticky nothing (the page is short enough).

## States you must design (all reachable, all must look intentional)

1. **Brand-new** (no diagnostic): diagnostic CTA in the readiness slot, vitals
   show honest zeros with invitations ("Sit the 15-min diagnostic to map this"),
   hero = first mission.
2. **Measuring** (<20 answers): readiness shows "still measuring · N of 20
   answers" progress, not an empty ring.
3. **Active mid-journey** (the default): everything live.
4. **Mission complete today**: hero swaps to the secured state; streak tile
   green "Secured for today ✓".
5. **Mock gate locked** (prob < 60): mock tile shows amber meter toward 60%
   with "reach 60% to unlock".
6. **Exam-ready** (3 mocks passed, latest passed): mock tile green
   "Exam-ready — keep it warm".
7. **Recovery** (failed real exam): "Retake run" banner, amber, retake
   countdown, "fresh mock passed — hold it warm" once proven.
8. **Returning after missed days**: calm re-spread note; streak per shield
   state (held if shielded/paused, honest 0 if gone) — never a red alarm.
9. **Free tier**: mock tile shows upgrade note; upgrade pill in footer.
   Paywall modal logic exists — do not redesign it here.
10. **Loading**: skeletons with the exact final dimensions — zero layout shift.

## Accessibility & quality gates (ship-blocking)

- Body text >=4.5:1 contrast in BOTH themes (test dark explicitly — cards are
  3% white on near-black; borders matter).
- C.faint only for metadata, never for text the learner must read.
- Visible keyboard focus on every interactive element; aria-labels on icon-only
  controls; heading order h1 → h2/h3 without skips.
- Color never the sole encoding: pair band colors with the band word
  ("Strong pass zone"), green checks with ✓ glyphs.
- prefers-reduced-motion: all entrances render instantly (initial={false}).
- No horizontal page scroll at 360px. No layout shift when data lands.

## Deliverables

Modify `src/pages/Dashboard.tsx` (and its small local components VitalTile /
PlanRoute usage) only. Do not touch data hooks, gating, paywall logic,
routing, or analytics events. Do not add dependencies. Reuse ui.tsx primitives;
if a Lucide icon is missing, add it to the ICONS map in ui.tsx — that is the
only permitted change outside the page.

Definition of done: npm run typecheck, npm run lint (0 errors), npm test all
green (the existing render tests must pass); both themes reviewed; 360px and
1280px reviewed; the 3-second "what now?" test passes on both.
