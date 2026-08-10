/*
 * Scholify's social accounts — the single source of truth for the whole
 * codebase, web and email alike.
 *
 * Plain TS on purpose: api/ compiles under tsconfig.api.json with types:
 * ["node"] and no JSX, so the serverless email templates can import this file
 * directly. The React marks live in src/components/social.tsx, which decorates
 * this list rather than repeating it.
 *
 * NOTE on LinkedIn: the company page was supplied as
 * .../company/112227580/admin/dashboard/, which is the ADMIN console and
 * resolves only for page admins. The public form is used instead.
 */

export interface SocialAccount {
  name: string
  href: string
}

export const SOCIAL_LINKS: SocialAccount[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/112227580/" },
  { name: "Instagram", href: "https://www.instagram.com/scholifyaiapp/" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61593102658034" },
  { name: "Telegram", href: "https://t.me/scholify_app" },
  { name: "Reddit", href: "https://www.reddit.com/user/scholifyapp/" },
]

/**
 * The social row for transactional email.
 *
 * Text links, not icons: every mark Scholify owns is an SVG, and Outlook and
 * several webmail clients drop SVG entirely — a hosted PNG sprite would be the
 * alternative, and it breaks the moment images are blocked, which is the
 * default in most clients. Words always render.
 *
 * Inline styles only, and no flexbox — email clients support neither
 * stylesheets nor modern layout reliably.
 */
export function socialRowHtml(color = "#8F8C85"): string {
  return SOCIAL_LINKS.map(
    (s) =>
      `<a href="${s.href}" style="color:${color};text-decoration:underline;white-space:nowrap;">${s.name}</a>`,
  ).join(' <span style="color:#C9C4BE;">&middot;</span> ')
}
