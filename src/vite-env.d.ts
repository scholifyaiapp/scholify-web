/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_PADDLE_TOKEN?: string
  readonly VITE_PADDLE_BEGINNER_MONTHLY?: string
  readonly VITE_PADDLE_PRO_MONTHLY?: string
  readonly VITE_PADDLE_ANNUAL_PRO?: string
  readonly VITE_API_URL?: string
  readonly VITE_APP_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
