import { beforeEach, describe, expect, it, vi } from "vitest"
import type { DiagnosticResult } from "@/lib/acca-diagnostic"

/*
 * persistDiagnostic writes the durable copy of a diagnostic. Migration 0025 added
 * `source` and `evidence` to the insert; until it is applied PostgREST rejects
 * the WHOLE row, so every ordinary diagnostic silently stopped reaching the
 * cloud — silently because insert() RESOLVES with an error instead of throwing,
 * and the returned error was never inspected. These tests pin the degrade path.
 */

const inserts: Record<string, unknown>[] = []
let failWith: { code?: string; message?: string } | null = null

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: {
    auth: {
      getSession: async () => ({ data: { session: { user: { id: "user-one" } } } }),
      getUser: async () => ({ data: { user: { id: "user-one" } } }),
    },
    from: () => ({
      insert: async (row: Record<string, unknown>) => {
        inserts.push(row)
        // Only the first attempt fails; the retry (no source/evidence) succeeds.
        if (failWith && "source" in row) return { error: failWith }
        return { error: null }
      },
    }),
  },
}))

const { persistDiagnostic } = await import("./acca-cloud")

const result = {
  paperId: "FR",
  passProbability: 61,
  estimatedScore: 58,
  confidence: 0.8,
  questionsAnswered: 25,
  rawCorrect: 15,
  areas: [],
  weakest: [],
  strongest: [],
  target: 75,
  answeredAt: "2026-07-27T10:00:00.000Z",
} as unknown as DiagnosticResult

beforeEach(() => {
  localStorage.clear()
  inserts.length = 0
  failWith = null
  vi.spyOn(console, "warn").mockImplementation(() => {})
})

describe("persistDiagnostic", () => {
  it("writes source and evidence when the schema has them", async () => {
    await persistDiagnostic(result)
    expect(inserts).toHaveLength(1)
    expect(inserts[0].source).toBe("diagnostic")
    expect(inserts[0].evidence).toEqual({})
  })

  it("retries without the 0025 columns when Postgres reports an undefined column", async () => {
    failWith = { code: "42703", message: `column "source" of relation "acca_diagnostics" does not exist` }
    await persistDiagnostic(result)
    expect(inserts).toHaveLength(2)
    // The diagnostic still lands — just without the new provenance fields.
    expect(inserts[1]).not.toHaveProperty("source")
    expect(inserts[1]).not.toHaveProperty("evidence")
    expect(inserts[1].pass_probability).toBe(61)
  })

  it("retries when PostgREST reports the column missing from its schema cache", async () => {
    failWith = { code: "PGRST204", message: "Could not find the 'evidence' column of 'acca_diagnostics'" }
    await persistDiagnostic(result)
    expect(inserts).toHaveLength(2)
    expect(inserts[1]).not.toHaveProperty("evidence")
  })

  it("does NOT retry on an unrelated failure — that would double-write", async () => {
    failWith = { code: "42501", message: "new row violates row-level security policy" }
    await persistDiagnostic(result)
    expect(inserts).toHaveLength(1)
  })

  it("always keeps the local copy, whatever the cloud does", async () => {
    failWith = { code: "42703", message: `column "source" does not exist` }
    await persistDiagnostic(result)
    expect(localStorage.getItem("scholify-acca-diagnostics")).toContain("FR")
  })
})
