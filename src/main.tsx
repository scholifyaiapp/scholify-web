import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorBoundary from "./ErrorBoundary"
import { LanguageProvider } from "./i18n/LanguageProvider"
import { AuthProvider } from "./lib/auth"
import { ToastProvider } from "./components/Toast"
import { ThemeProvider } from "./lib/theme"
import { captureError, initAnalytics } from "./lib/analytics"
import "./index.css"

initAnalytics()

// Crashes outside React's tree (event handlers, async work, rejected promises)
// never reach an error boundary — catch them here so nothing goes unreported.
window.addEventListener("error", (e) => {
  captureError(e.error ?? e.message, {
    source: "window.onerror",
    file: e.filename,
    line: e.lineno,
    col: e.colno,
  })
})

window.addEventListener("unhandledrejection", (e) => {
  captureError(e.reason, { source: "unhandledrejection" })
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <LanguageProvider>
            <BrowserRouter>
              <AuthProvider>
                <App />
              </AuthProvider>
            </BrowserRouter>
          </LanguageProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)

// Remove any previously-installed service worker. An earlier SW cached the app
// shell and caused stale-chunk crashes after deploys ("importing a module
// script failed"). Unregister it and clear its caches so the app always loads
// fresh from the network. (The self-destructing /sw.js handles devices that are
// still controlled by the old worker.)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((regs) => regs.forEach((r) => r.unregister()))
    .catch(() => {})
  if ("caches" in window) {
    caches
      .keys()
      .then((keys) => keys.forEach((k) => caches.delete(k)))
      .catch(() => {})
  }
}
