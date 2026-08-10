/*
 * Scholify's social presence, for the web.
 *
 * The URLs themselves live in src/lib/social-links.ts, which is plain TS so the
 * serverless email templates in api/ can import the same list. This file only
 * adds the marks.
 *
 * lucide dropped its brand glyphs at v1, so the marks are inline. They are all
 * aria-hidden: the link's own aria-label carries the meaning.
 */

import { SOCIAL_LINKS, type SocialAccount } from "@/lib/social-links"

export interface SocialLink extends SocialAccount {
  Mark: (props: { size?: number }) => React.ReactElement
}

export function LinkedInMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function InstagramMark({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  )
}

export function TelegramMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M11.94 24C18.53 24 24 18.62 24 12S18.53 0 11.94 0C5.36 0 0 5.38 0 12s5.36 12 11.94 12Zm-6.5-11.75 11.4-4.4c.53-.19 1 .13.82.94l-1.94 9.15c-.14.65-.53.81-1.08.5l-3-2.21-1.44 1.4c-.16.16-.3.29-.6.29l.21-3.06 5.58-5.04c.24-.21-.05-.33-.37-.12l-6.9 4.34-2.97-.93c-.65-.2-.66-.64.14-.95Z" />
    </svg>
  )
}

export function RedditMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm6.07 13.37c.02.19.03.38.03.58 0 2.95-3.44 5.34-7.68 5.34s-7.68-2.39-7.68-5.34c0-.2.01-.4.04-.6a1.73 1.73 0 1 1 1.9-2.82 9.42 9.42 0 0 1 5.1-1.62l.97-4.55a.36.36 0 0 1 .43-.28l3.19.68a1.22 1.22 0 1 1-.15.72l-2.83-.6-.86 4.04a9.4 9.4 0 0 1 5.02 1.62 1.73 1.73 0 1 1 1.9 2.84ZM8.4 12.9a1.22 1.22 0 1 0 0 2.44 1.22 1.22 0 0 0 0-2.44Zm7.2 0a1.22 1.22 0 1 0 0 2.44 1.22 1.22 0 0 0 0-2.44Zm-1.03 3.83a.37.37 0 0 0-.51 0 3.6 3.6 0 0 1-2.06.53 3.6 3.6 0 0 1-2.06-.53.36.36 0 1 0-.5.52 4.28 4.28 0 0 0 2.56.7 4.28 4.28 0 0 0 2.57-.7.37.37 0 0 0 0-.52Z" />
    </svg>
  )
}

const MARKS: Record<string, SocialLink["Mark"]> = {
  LinkedIn: LinkedInMark,
  Instagram: InstagramMark,
  Facebook: FacebookMark,
  Telegram: TelegramMark,
  Reddit: RedditMark,
}

/** The shared account list, decorated with its marks. */
export const SOCIALS: SocialLink[] = SOCIAL_LINKS.filter((account) => account.name in MARKS).map((account) => ({
  ...account,
  Mark: MARKS[account.name],
}))
