/*
 * Paddle Billing integration for the Scholify web app.
 *
 * The Paddle.js script is loaded in index.html. Checkout opens client-side
 * via Paddle's overlay. The mobile app uses RevenueCat separately.
 *
 * Required env vars (see .env.example):
 *   VITE_PADDLE_TOKEN              — Paddle client-side token
 *   VITE_PADDLE_BEGINNER_MONTHLY  — price id for Beginner monthly
 *   VITE_PADDLE_PRO_MONTHLY       — price id for Pro monthly
 *   VITE_PADDLE_ANNUAL_PRO        — price id for Annual Pro
 *
 * Every function degrades gracefully: if Paddle isn't loaded or no token is
 * configured, `openCheckout` returns false so the caller can show a notice.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

let initialized = false

function getPaddle(): any | null {
  if (typeof window === "undefined") return null
  return (window as any).Paddle ?? null
}

/** Initialise Paddle once. Safe to call repeatedly. Returns the Paddle object. */
export function initPaddle(): any | null {
  const Paddle = getPaddle()
  if (!Paddle) return null
  if (initialized) return Paddle
  const token = import.meta.env.VITE_PADDLE_TOKEN
  if (!token) return null
  try {
    Paddle.Initialize({ token })
    initialized = true
    return Paddle
  } catch {
    return null
  }
}

/** True when Paddle is loaded and a client token is configured. */
export function isPaddleConfigured(): boolean {
  return Boolean(getPaddle()) && Boolean(import.meta.env.VITE_PADDLE_TOKEN)
}

/** Convenience accessors for the configured price ids. */
export const PADDLE_PRICES = {
  beginnerMonthly: import.meta.env.VITE_PADDLE_BEGINNER_MONTHLY,
  proMonthly: import.meta.env.VITE_PADDLE_PRO_MONTHLY,
  annualPro: import.meta.env.VITE_PADDLE_ANNUAL_PRO,
} as const

/**
 * Open the Paddle checkout overlay for a price.
 * Returns false if Paddle isn't ready or the price id is missing — the
 * caller should then surface a "payments coming soon" message.
 */
export function openCheckout(priceId: string | undefined, email?: string): boolean {
  const Paddle = initPaddle()
  if (!Paddle || !priceId) return false
  try {
    Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      ...(email ? { customer: { email } } : {}),
      settings: {
        displayMode: "overlay",
        theme: "dark",
        frameStyle: "background-color: #050508",
        successUrl: `${window.location.origin}/dashboard?upgraded=true`,
      },
    })
    return true
  } catch {
    return false
  }
}
