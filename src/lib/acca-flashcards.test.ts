import { describe, it, expect } from "vitest"
import {
  getFlashcards,
  getDueFlashcards,
  reviewFlashcard,
  flashcardStats,
} from "@/lib/acca-flashcards"
import { getPapers } from "@/lib/acca"

/*
 * Spaced repetition.
 *
 * The audit found "Know" and "Don't know" produced BYTE-IDENTICAL state for a
 * new card — both sent it to box 1, due tomorrow. So the buttons did the same
 * thing, and a card you'd just failed never came back in the session. The single
 * most important property of a flashcard system (failing costs you) was absent.
 */

describe("the decks themselves", () => {
  it("gives every paper a real deck, with cards that belong to it", () => {
    for (const paper of getPapers()) {
      const cards = getFlashcards(paper.id)
      expect(cards.length).toBeGreaterThanOrEqual(40)
      expect(cards.every((c) => c.paper === paper.id)).toBe(true)
      expect(cards.every((c) => c.front.trim() && c.back.trim())).toBe(true)
    }
  })

  it("starts every card due — a fresh deck is fully available", () => {
    const total = getFlashcards("FA").length
    expect(getDueFlashcards("FA").length).toBe(total)
  })
})

describe("reviewFlashcard", () => {
  const firstCard = () => getFlashcards("FA")[0]

  it("makes failing COST something — a miss is not the same as a hit", () => {
    const a = reviewFlashcard(firstCard().id, true)
    const b = reviewFlashcard(getFlashcards("FA")[1].id, false)
    expect(a).not.toEqual(b)
    expect(a.box).toBeGreaterThan(b.box)
  })

  it("brings a failed card back in the SAME session", () => {
    const review = reviewFlashcard(firstCard().id, false)
    expect(review.relearn).toBe(true)
    expect(review.box).toBe(0)
    // …and it is still due today, so it also returns tomorrow if the session ends.
    expect(getDueFlashcards("FA").some((c) => c.id === firstCard().id)).toBe(true)
  })

  it("does not bring a known card back today", () => {
    const card = firstCard()
    const review = reviewFlashcard(card.id, true)
    expect(review.relearn).toBe(false)
    expect(getDueFlashcards("FA").some((c) => c.id === card.id)).toBe(false)
  })

  it("advances the interval with each success, and mastery is reachable", () => {
    const card = firstCard()
    let box = 0
    for (let i = 0; i < 6; i++) {
      const r = reviewFlashcard(card.id, true)
      expect(r.box).toBeGreaterThanOrEqual(box)
      box = r.box
    }
    expect(flashcardStats("FA").mastered).toBeGreaterThanOrEqual(1)
  })

  it("sends a lapsed card back to the start, however well it was known before", () => {
    const card = firstCard()
    for (let i = 0; i < 5; i++) reviewFlashcard(card.id, true)
    const lapse = reviewFlashcard(card.id, false)
    expect(lapse.box).toBe(0)
    expect(lapse.relearn).toBe(true)
  })

  /*
   * LOCAL date, not toISOString().
   *
   * The scheduler builds every due date from getFullYear/getMonth/getDate —
   * deliberately, because "due today" has to mean the learner's today, not
   * UTC's. This test compared those local dates against a UTC one, so from
   * 19:00 UTC onwards the two are a day apart and the assertion flipped. It
   * failed for the first time at 00:03 in Tashkent (UTC+5), five minutes into
   * the day after launch — and it would have failed every night from then on,
   * for five hours, on the founder's own machine.
   *
   * A suite that goes red for part of every day teaches you to ignore red,
   * which is the expensive part. The implementation is right; the assertion
   * was measuring it with the wrong clock.
   */
  const localToday = () => {
    const d = new Date()
    return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
  }

  it("never leaves a card due forever, nor never", () => {
    const card = firstCard()
    const known = reviewFlashcard(card.id, true)
    expect(known.due > localToday()).toBe(true) // in the future
    const failed = reviewFlashcard(card.id, false)
    expect(failed.due <= localToday()).toBe(true) // today
  })
})

describe("flashcardStats", () => {
  it("counts down the due pile as cards are learned", () => {
    const before = flashcardStats("FA")
    reviewFlashcard(getFlashcards("FA")[0].id, true)
    const after = flashcardStats("FA")
    expect(after.due).toBe(before.due - 1)
    expect(after.total).toBe(before.total)
  })
})
