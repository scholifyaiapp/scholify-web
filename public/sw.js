/*
 * Self-destructing service worker.
 *
 * Earlier versions cached the app shell, which caused stale-chunk crashes
 * ("importing a module script failed") after deploys: a cached index.html kept
 * pointing at JS chunk hashes that no longer exist, and the SPA rewrite then
 * served HTML in place of the missing .js — a MIME error the browser rejects.
 *
 * This version removes itself. The browser auto-checks /sw.js on navigation,
 * installs this, and on activate it deletes every cache, unregisters, and
 * reloads open tabs — so every device falls back to plain, always-fresh
 * network loading. (Offline/push can return later via a properly versioned,
 * precache-manifest service worker.)
 */

self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys()
        await Promise.all(keys.map((k) => caches.delete(k)))
      } catch {
        /* ignore */
      }
      try {
        await self.registration.unregister()
      } catch {
        /* ignore */
      }
      try {
        const clients = await self.clients.matchAll({ type: "window" })
        for (const client of clients) {
          client.navigate(client.url)
        }
      } catch {
        /* ignore */
      }
    })(),
  )
})
