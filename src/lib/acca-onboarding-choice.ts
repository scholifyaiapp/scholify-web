/*
 * Keyboard and focus logic for the onboarding selection controls.
 *
 * Lives in lib/ rather than beside the component because it is the only part of
 * ChoiceGroup that can be TESTED: vitest runs this project in the "node"
 * environment (vitest.config.ts), so there is no DOM and no render test. Pulling
 * the arrow-key arithmetic and the tabindex rule out here means the two things
 * most likely to be silently wrong are covered by the normal suite, and the JSX
 * left behind is thin enough to read at a glance.
 *
 * WHY A RADIOGROUP AT ALL
 *
 * Every "pick one of these" control in the onboarding deck was a plain <button>
 * with a red border when active. Visually fine; to a screen reader, nine
 * identical unlabelled buttons with no indication which one is chosen — the
 * selected state existed only as a colour. That is two separate failures
 * (announced state, and colour-as-only-signal), and it repeated fifteen times.
 *
 * role="radiogroup" + role="radio" + aria-checked is the pattern that fixes it,
 * but it comes with an obligation: a radiogroup is ONE tab stop, and arrow keys
 * move within it. Adding the roles without that keyboard behaviour would make
 * things worse than plain buttons, because plain buttons are at least all
 * reachable by Tab. So the roving tabindex below is not a nicety — it is the
 * other half of the contract.
 */

/** Arrow/Home/End keys a radiogroup must handle. Anything else is not ours. */
const FORWARD = new Set(["ArrowRight", "ArrowDown"])
const BACKWARD = new Set(["ArrowLeft", "ArrowUp"])

/**
 * Which item the focus moves to when `key` is pressed inside a radiogroup.
 * Returns null when the key is not a navigation key, so the caller can leave the
 * event alone rather than swallowing Tab, Enter or Escape.
 *
 * Wraps at both ends, which is what native radio groups do — reaching the last
 * option and pressing Down again returns to the first rather than dead-ending.
 *
 * All four arrows are accepted regardless of whether the group is laid out in a
 * row or a column. Native radios behave this way, and the deck mixes
 * orientations (pills in a row, cards in a column, tiles in a grid); making the
 * accepted keys depend on layout would mean the same control answered different
 * keys on different slides.
 */
export function nextChoiceIndex(key: string, current: number, count: number): number | null {
  if (count <= 0) return null
  if (key === "Home") return 0
  if (key === "End") return count - 1

  // current === -1 means nothing is selected yet. Forward should land on the
  // first option and backward on the last, rather than computing from -1.
  if (FORWARD.has(key)) return current < 0 ? 0 : (current + 1) % count
  if (BACKWARD.has(key)) return current < 0 ? count - 1 : (current - 1 + count) % count

  return null
}

/**
 * tabIndex for the item at `index`, given the selected item (-1 for none).
 *
 * The rule from the ARIA radiogroup pattern: the group is a single tab stop, so
 * exactly ONE item is tabbable. That is the selected item once a choice exists,
 * and the first item before then — which is what makes an untouched group
 * reachable by Tab at all.
 *
 * Returning 0 for more than one item would put every option back in the tab
 * order and undo the point of the group; returning -1 for all of them would
 * strand keyboard users outside it entirely. Both are easy to get wrong by
 * accident, hence the test.
 */
export function choiceTabIndex(index: number, selectedIndex: number): 0 | -1 {
  if (selectedIndex < 0) return index === 0 ? 0 : -1
  return index === selectedIndex ? 0 : -1
}
