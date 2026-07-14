import { loadAllPaperContent } from "@/lib/acca-paper-content"

/*
 * Scholify — the NODE bootstrap for ACCA content. Read acca-content-registry.ts
 * first: it explains why content is loaded per paper and why the getters stayed
 * synchronous.
 *
 * Outside the browser there is no bundler, no network and no React lifecycle to
 * hang a loader off: `npm run audit:content`, `npm run validate:chapters` (both
 * tsx) and the vitest suite all call the SYNC getters straight from module scope
 * and never await anything. So when we are not in a browser bundle, we fill the
 * registry eagerly, once, at import time — after which every getter behaves
 * exactly as it did before the content was split.
 *
 * How the environment is detected: `import.meta.env` is injected by Vite (and by
 * Vitest, which sets MODE = "test"), and is undefined under plain Node/tsx. So the
 * eager path runs for tsx + vitest and NEVER for `vite dev` / `vite build`, where
 * MODE is development | production and only the ACTIVE paper is ever fetched.
 *
 * It costs the browser bundle nothing: loadAllPaperContent() calls the same
 * per-paper dynamic loaders the app uses, so it adds no chunk and no bytes — the
 * branch below is simply false in a browser and nothing is fetched.
 *
 * Every content BARREL imports this module for its side effect, so any Node entry
 * point — whichever barrel it happens to reach first — gets a populated registry.
 */

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, unknown> }).env

const IS_BROWSER_BUNDLE =
  Boolean(viteEnv) && viteEnv?.MODE !== "test" && viteEnv?.VITEST !== true && viteEnv?.TEST !== true

if (!IS_BROWSER_BUNDLE) {
  await loadAllPaperContent()
}

export {}
