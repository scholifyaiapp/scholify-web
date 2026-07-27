import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { sendPartnerEmail } from "../../api/affiliate.js"

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test")
  vi.stubEnv("FEEDBACK_FROM", "Scholify <feedback@scholifyapp.com>")
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe("feedback email delivery", () => {
  it("sends through the configured verified sender and returns the provider id", async () => {
    const request = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "email_123" }), { status: 200 }),
    )
    await expect(sendPartnerEmail({
      to: "learner@example.com",
      replyTo: "reply@example.com",
      subject: "Feedback received",
      html: "<p>Thank you</p>",
    })).resolves.toBe("email_123")
    const body = JSON.parse(String(request.mock.calls[0]?.[1]?.body))
    expect(body).toMatchObject({
      from: "Scholify <feedback@scholifyapp.com>",
      to: "learner@example.com",
      reply_to: "reply@example.com",
    })
  })

  it("retries temporary Resend failures before succeeding", async () => {
    const request = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(JSON.stringify({ message: "busy" }), { status: 503 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: "email_retry" }), { status: 200 }))
    await expect(sendPartnerEmail({ to: "learner@example.com", subject: "Feedback", html: "<p>Hi</p>" }))
      .resolves.toBe("email_retry")
    expect(request).toHaveBeenCalledTimes(2)
  })

  it("fails explicitly when email configuration is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "")
    await expect(sendPartnerEmail({ to: "learner@example.com", subject: "Feedback", html: "<p>Hi</p>" }))
      .rejects.toThrow("RESEND_API_KEY")
  })

  it("surfaces permanent provider rejection without retrying", async () => {
    const request = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "sender domain is not verified" }), { status: 403 }),
    )
    await expect(sendPartnerEmail({ to: "learner@example.com", subject: "Feedback", html: "<p>Hi</p>" }))
      .rejects.toThrow("sender domain is not verified")
    expect(request).toHaveBeenCalledTimes(1)
  })
})
