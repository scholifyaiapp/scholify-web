import { defineConfig } from "vitest/config"
import { fileURLToPath } from "node:url"

/*
 * The suite that should have existed before the 2026-07-14 audit.
 *
 * Every bug that audit found was found by a human reading code, not by a test —
 * a mock gate that unlocked after two answers, a meter that failed open, an
 * unanswered question that graded as correct. So the suite is deliberately
 * aimed at the MONEY and TRUST paths, not at coverage percentage:
 *
 *   acca.test.ts            grading, stats, corrupt-storage self-heal
 *   acca-diagnostic.test.ts the pass probability we show students
 *   acca-loop.test.ts       the mock gate
 *   acca-options.test.ts    option shuffling (answer-position bias)
 *   acca-flashcards.test.ts spaced repetition + the relearning loop
 *   billing.test.ts         Paddle plan mapping + signature freshness
 *
 * Node has no localStorage; setup.ts provides one, since the whole engine is
 * localStorage-first by design.
 */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.ts", "api/**/*.test.ts"],
  },
})
