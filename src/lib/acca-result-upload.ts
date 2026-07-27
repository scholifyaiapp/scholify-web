import { getPaper } from "@/lib/acca"
import { persistDiagnostic } from "@/lib/acca-cloud"
import type { DiagnosticAreaResult, DiagnosticResult } from "@/lib/acca-diagnostic"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

const API_BASE = import.meta.env.VITE_API_URL || ""
export const RESULT_PDF_MAX_BYTES = 3 * 1024 * 1024

export interface ResultUploadAnalysis {
  paperId: string
  resultKind: "mock" | "failed-exam"
  score: number
  confidence: number
  headline: string
  feedback: string
  areas: { code: string; label: string; score: number }[]
}

async function authHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (!isSupabaseConfigured) return headers
  const { data } = await supabase.auth.getSession()
  if (data.session?.access_token) headers.Authorization = `Bearer ${data.session.access_token}`
  return headers
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("The PDF could not be read."))
    reader.onload = () => {
      const value = String(reader.result || "")
      resolve(value.slice(value.indexOf(",") + 1))
    }
    reader.readAsDataURL(file)
  })
}

export async function analyseResultPdf(file: File, paperId: string): Promise<ResultUploadAnalysis> {
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Please upload a PDF file.")
  }
  if (file.size > RESULT_PDF_MAX_BYTES) throw new Error("Use a PDF smaller than 3 MB.")
  const paper = getPaper(paperId)
  if (!paper) throw new Error("Choose your paper first.")

  const response = await fetch(`${API_BASE}/api/lara?action=acca-result-upload`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({
      paperId,
      paperName: paper.name,
      filename: file.name,
      areas: paper.areas,
      pdfBase64: await fileToBase64(file),
    }),
  })
  const data = await response.json().catch(() => ({})) as ResultUploadAnalysis & { error?: string }
  if (!response.ok) throw new Error(data.error || "Charles couldn't analyse this result.")
  return data
}

export async function analyseEnglishCertificate(file: File, certificateType: string): Promise<{ level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"; certificateType: string }> {
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) throw new Error("Use the original certificate PDF.")
  if (file.size > RESULT_PDF_MAX_BYTES) throw new Error("Use a certificate PDF smaller than 3 MB.")
  const response = await fetch(`${API_BASE}/api/lara?action=acca-language-evidence`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ certificateType, pdfBase64: await fileToBase64(file) }),
  })
  const data = await response.json().catch(() => ({})) as { level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"; certificateType?: string; error?: string }
  if (!response.ok || !data.level) throw new Error(data.error || "Charles couldn't read this certificate.")
  return { level: data.level, certificateType: data.certificateType || certificateType }
}

export async function useUploadedResult(analysis: ResultUploadAnalysis, filename: string): Promise<DiagnosticResult> {
  const areas: DiagnosticAreaResult[] = analysis.areas.map((area) => ({
    ...area,
    seen: 1,
    correct: area.score >= 0.5 ? 1 : 0,
    band: area.score < 0.5 ? "weak" : area.score < 0.7 ? "moderate" : "strong",
  }))
  const ranked = [...areas].sort((a, b) => a.score - b.score)
  const passProbability = Math.round(100 / (1 + Math.exp(-0.11 * (analysis.score - 50))))
  const focusAreas = ranked.slice(0, 3).map((area) => area.label)
  const result: DiagnosticResult = {
    paperId: analysis.paperId,
    answeredAt: new Date().toISOString(),
    questionsAnswered: 0,
    rawCorrect: 0,
    estimatedScore: analysis.score,
    passProbability,
    confidence: analysis.confidence,
    source: "result-upload",
    evidence: {
      kind: analysis.resultKind,
      filename: filename.slice(0, 140),
      headline: analysis.headline,
      feedback: analysis.feedback,
    },
    areas,
    weakest: ranked.slice(0, 3),
    strongest: [...ranked].reverse().slice(0, 3),
    target: {
      focusAreas,
      targetScore: 0.7,
      projectedPassProbability: Math.min(95, passProbability + Math.max(8, focusAreas.length * 5)),
    },
  }
  await persistDiagnostic(result)
  return result
}
