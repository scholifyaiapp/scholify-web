/*
 * Scholify service worker.
 *
 * - Navigation requests: network-first (so new deploys are picked up
 *   immediately), with the cached shell as an offline fallback.
 * - Static assets: cache-first (filenames are content-hashed, so this
 *   is safe and makes repeat visits fast / offline-capable).
 * - Web Push: receives notifications and handles clicks.
 */

const CACHE = "scholify-v2"
const PRECACHE = ["/"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => {}),
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      ),
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  const req = event.request
  if (req.method !== "GET") return

  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  // Never intercept the API — those must always hit the network.
  if (url.pathname.startsWith("/api/")) return

  // HTML navigations → network-first so deploys go live instantly.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put("/", copy)).catch(() => {})
          return res
        })
        .catch(() => caches.match("/").then((c) => c || caches.match(req))),
    )
    return
  }

  // Static assets → cache-first (hashed names make stale cache harmless).
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached
      return fetch(req)
        .then((res) => {
          if (res && res.ok && res.type === "basic") {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {})
          }
          return res
        })
        .catch(() => cached)
    }),
  )
})

/* ── Web Push ───────────────────────────────────────────────── */

self.addEventListener("push", (event) => {
  let data = {}
  try {
    data = event.data ? event.data.json() : {}
  } catch {
    data = {}
  }

  const options = {
    body: data.body || "Your daily task is ready.",
    icon: "/icon-192.png",
    badge: "/favicon.png",
    tag: "scholify-daily",
    renotify: true,
    requireInteraction: false,
    data: {
      url: data.url || "/dashboard",
      taskTitle: data.taskTitle,
      streak: data.streak,
    },
    actions: [
      { action: "open", title: "View task" },
      { action: "dismiss", title: "Later" },
    ],
    vibrate: [100, 50, 100],
  }

  event.waitUntil(self.registration.showNotification(data.title || "✦ Scholify", options))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  if (event.action === "dismiss") return

  const target = (event.notification.data && event.notification.data.url) || "/dashboard"

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      const existing = windowClients.find((c) => c.url.includes(target))
      if (existing) return existing.focus()
      return self.clients.openWindow(target)
    }),
  )
})
