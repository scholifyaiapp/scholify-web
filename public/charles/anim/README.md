# Animated Charles — drop-in folder

Put **transparent animated** mascot files here and Charles plays them natively
(real frame animation: hand wave, blink, bounce), no code rework.

## Format (in order of preference)
1. **Animated WebP** — transparent, seamless loop, 512×512, quality ~85. Best:
   tiny, native `<img>` playback, transparent, no JS library.
2. **APNG** — same idea, larger files. Works natively too.
3. **GIF** — works, but no soft alpha edges (hard transparency only). Last resort.

> Must be **transparent background** (Charles floats over light *and* dark
> screens). Opaque MP4/GIF from AI image-to-video will NOT work as a floating
> mascot — only on dark panels.

## How to turn one on
1. Export the loop (e.g. a gentle wave) as `wave.webp` and drop it in this folder.
2. In `src/components/CharlesMascot.tsx`, uncomment the matching line in `ANIM`:
   ```ts
   const ANIM = {
     wave: "/charles/anim/wave.webp",
   }
   ```
   That's it — every place that uses `pose="wave"` now plays the real animation
   (the CSS float idle auto-switches off so the frames do the motion).

## Suggested first files (map → where they show)
| file | pose | shows on |
|------|------|----------|
| `wave.webp` | wave | avatar, dashboard greeting, landing "Meet Charles" |
| `celebrate.webp` | celebrate | mission complete, mock pass |
| `thinking.webp` | thinking | AI thinking / tips |
| `present.webp` | present | diagnostic reveal, paywall |

## Prefer Lottie instead?
If you produce a Lottie `.json` (vector, transparent, state-triggerable), tell me
and I'll add the lightweight player + a `<CharlesLottie state="…">` component.
I defaulted to animated-WebP because it needs no dependency and is transparent
out of the box.
