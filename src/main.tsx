import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorBoundary from "./ErrorBoundary"
import { LanguageProvider } from "./i18n/LanguageProvider"
import { AuthProvider } from "./lib/auth"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
)
