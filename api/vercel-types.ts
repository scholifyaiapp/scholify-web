import type { IncomingMessage, ServerResponse } from "node:http"

export type VercelQueryValue = string | string[] | undefined

/** Runtime shape supplied to Node serverless functions by Vercel. */
export interface VercelRequest extends IncomingMessage {
  body: unknown
  query: Record<string, VercelQueryValue>
  cookies?: Record<string, string>
}

export interface VercelResponse extends ServerResponse {
  status(code: number): VercelResponse
  json(value: unknown): VercelResponse
  send(value: unknown): VercelResponse
  redirect(statusOrUrl: number | string, url?: string): VercelResponse
}
