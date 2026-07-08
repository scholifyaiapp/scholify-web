# Scholify — Vision & Founder PRD

**Document 1 of 8 · v1.0 · 2026-07-08**
**Status: the product this document describes is built and live at scholifyapp.com.**

---

## 1. The one-sentence vision

**Scholify is the learning operating system for ACCA students: a GPS that takes one student from "am I going to pass?" to "passed — next paper," and never stops recalculating until they get there.**

Not a question bank. Not a course. An outcome engine.

---

## 2. The problem, stated honestly

The ACCA qualification is 13 exams. Worldwide pass rates per paper hover between roughly 40% and 55%. That means the *median experience* of an ACCA student includes failing — often more than once — on the way to membership. Three structural problems make it worse:

1. **Students study blind.** They grind question banks with no idea whether they'd pass tomorrow. The single number that matters — *probability of passing* — is invisible until results day, when it is too late.
2. **Guidance is a luxury good.** In our beachhead market (Uzbekistan and the CIS), tuition centres charge €300–800 *per paper per attempt*. A full qualification through centres costs more than a year's salary for many students. The alternative — self-study — hands the student a syllabus and silence.
3. **Failure is treated as an ending.** Every tool on the market is built for the happy path. When a student fails a real sitting — the statistically *normal* event — their apps have nothing to say. No import of the result, no analysis of where the marks went, no rebuilt plan. The moment of highest emotional and pedagogical need is the moment every product goes quiet.

## 3. The insight

**What gets measured gets done — and what gets measured after failure gets recovered.**

Every serious training discipline — athletics, aviation, chess — closed the loop long ago: perform, measure, adjust, repeat. Exam preparation never did, because measurement was expensive: it needed a human tutor watching every answer. LLMs plus a well-designed learner model make measurement nearly free. That collapses the cost of the thing tuition centres actually sell — *knowing where you stand and what to do next* — from €500 per paper to cents per day.

The company that owns the measurement loop owns the category, because the loop compounds: every answer any student gives makes the model of "what predicts passing" better for every future student. The moat is not the AI vendor (everyone has Claude). The moat is the **learning data** — which explanations lift scores, which topic sequences work, what a 55% mock at week 6 predicts about the real sitting.

## 4. The product philosophy — the Loop

Everything in Scholify is one closed loop per paper. This is not a feature; it is the constitution, and every screen, metric, and line of copy is subordinate to it:

```
onboard → diagnostic → roadmap → today's mission → practise / drill / revise
   → progress check (live pass probability)
   → 60% gate → Mock 1 → Mock 2 → Mock 3 → real exam
   → PASS: celebrate, next paper, loop restarts
   → NOT THIS TIME: import the mark → AI reflection → model recalibrates
      → plan rebuilds → recovery missions → fresh mock → retake
```

Five laws derive from it:

- **Law 1 — The student never chooses what to study.** The model does. Every day the app hands down at most three tasks, already ordered ("① Recover the marks in Group Accounts · ~25 min"). Choice is cognitive load; the product's job is to remove it.
- **Law 2 — Every action feeds the model; every metric drives the next task.** An answer that doesn't update pass probability is a bug. A metric that doesn't change tomorrow's mission is decoration. (We audited the entire app against this law and fixed every violation.)
- **Law 3 — Readiness is earned, not claimed.** Mocks unlock at 60% pass probability, not before. The exam recommendation appears only after three mocks with the latest passed. The app never flatters.
- **Law 4 — Failure is a stage, not an ending.** A failed real sitting triggers the recovery run: the mark is imported as the strongest evidence the learner model ever receives, pass probability recalibrates downward honestly, and every answer afterwards *earns the number back*. The words "you failed" do not exist in this product. The words are: *"You now know exactly where the marks were lost. Let's recover them."*
- **Law 5 — There is no "finished."** Until the paper is passed, the loop keeps handing out the next best task. When it is passed, the next paper's loop begins. The terminal state of Scholify is ACCA membership.

## 5. What we built (state of the product, 2026-07-08)

This vision is not a plan; it is shipped:

- **The Dashboard** — a command centre answering "where am I and what's the one thing to do next": pass-probability ring against the 50% pass line, exam countdown with phase timeline, the next action with a single *Start now*, vitals (streak, goal, weakest topic, mock gate), qualification journey bar.
- **The Study cockpit** — the loop made visible ("YOU ARE HERE" strip), onboarding wizard, per-paper overview, the daily mission, study path with knowledge checks (65% mastery bar), practice with instant marking + Ask-Lara tutor, timed mocks, flashcards (SRS), AI Examiner for written papers, custom AI practice from the student's own notes, and the full journey map.
- **Analytics** — four tabs, four questions: *Am I going to pass?* (probability, Pass Momentum™, mastery, estimated score) · *What do I actually know?* (knowledge heatmap, weak topics, forgetting risk, learning velocity, confidence calibration) · *What do I do today?* (mission, streak, study time, revision queue, topic completion) · *Am I exam-ready?* (mock trends vs the pass line, time management vs the 90-second budget, mistake analysis by cause, exam countdown, real exam history). Plus the qualification roadmap with EPSM/PER membership tracking.
- **The learner model** — a real statistical core (difficulty-weighted per-area competence, Bayesian shrinkage, coverage-confidence regression, logistic pass mapping) that produces a live pass probability from every answer, and **recalibrates on real exam results**.
- **The recovery run** — result import, AI examiner-style reflection, recalibrated probability shown honestly, rebuilt roadmap, recovery-flavoured missions, "prove it again" mock, retake countdown.
- **Instrumentation** — per-question timing, one-tap confidence marks, one-tap mistake causes, daily probability snapshots: the raw material of the data moat.
- **The business machinery** — Free/Beginner/Pro tiers with streak-triggered paywalls, 7-day trial, Paddle checkout with a signature-verified webhook writing entitlements, cancellation flow, referral program, EN/RU landing with an ROI calculator against tuition-centre prices.

Everything runs offline-first (localStorage with cloud sync) and degrades gracefully without any API key — a deliberate fit for our market's connectivity reality.

## 6. Who it's for

| Persona | Situation | What the loop gives them |
|---|---|---|
| **The first-timer** | University student or fresh graduate, first ACCA paper, no idea how to structure study | A plan they never have to design, and a number that tells them the truth |
| **The working professional** | Full-time job, 25–40 min/day, studying at night | Three tasks a day sized to their commitment; the model spends their scarce minutes on the highest-yield topic |
| **The retaker** (our signature persona) | Failed a sitting; demoralized; every other tool pretends it didn't happen | The recovery run: dignity, a diagnosis, and a road back — *this persona is why Scholify exists* |

## 7. Business model (summary — full model in Documents 7–8)

Sell the outcome, not the content. Free tier proves the loop; **Beginner $9.99/mo** ($79.99/yr) unlocks unlimited practice depth; **Pro $14.99/mo** ($119.99/yr) unlocks the exam room — mocks, AI Examiner, custom AI practice. 33% annual discount. Contribution margins ~85% after Paddle and AI costs; CAC payback ~2.4 months in the beachhead; breakeven at roughly 20 Pro subscribers. Guardrails are codified (price floor $9.47, max CAC $53, AI cost ceiling $2.80/user/mo).

## 8. Why us, why now

- **Why now:** frontier-model costs fell below the price of a single tutoring minute; ACCA enrollment in Central Asia is growing; Makon AI's traction in Uzbekistan validates willingness to pay for AI exam prep — while leaving the loop, the recovery run, and the full qualification arc unclaimed.
- **Why us:** a founder inside the target market and its languages, and an AI-co-founder development model that shipped a full learning OS — product, design system, analytics, payments, and eight foundational documents — at a burn rate of effectively zero. Our development speed *is* a moat: we iterate at the speed of conversation.

## 9. What we will not do

- We will not reproduce ACCA's copyrighted materials. Every question is original, syllabus-aligned. ACCA's trademark is respected everywhere.
- We will not translate the app itself. ACCA examines in English; studying in English is exam training. (The *landing* is EN/RU; the product is English by design.)
- We will not flatter. No inflated readiness, no "you're doing great" without evidence. The product's credibility is the honesty of its numbers.
- We will not chase adjacent exams (CFA, CPA, IELTS) until the ACCA loop is demonstrably winning. Focus is the strategy.

## 10. Success, defined

| Horizon | Definition of success |
|---|---|
| 90 days | Ops live (keys, metering, Paddle); 1,000 free learners in UZ/CIS; ≥2% free→paid; activation = diagnostic completed on day one |
| 12 months | 500+ paying subscribers (~$6k MRR); first cohort of students who **passed a paper they had previously failed** — our defining testimonial; measured model calibration (predicted vs actual pass rates) published in-product |
| 3 years | The default ACCA study tool of the CIS and a global challenger; the learning dataset large enough that our pass predictions are visibly better than anyone's; students arriving because "it got my friend through FR after two fails" |

The metric behind all of it — our north star — is **weekly active learners completing their daily mission**, because the loop only compounds for students who are inside it.

## 11. The founder's commitment

We measure ourselves the way the product measures students: honestly, continuously, against a pass line. Every document that follows this one (product requirements, design bible, AI and backend architecture, implementation guide, go-to-market, investor plan) is grounded in code that exists and numbers we can defend. When reality diverges from a document, we update the document the same day we learn it.

*What gets measured gets done. That's the product, and that's the company.*

---

*Next: [Document 2 — Complete Product Requirements](02-product-requirements.md)*
