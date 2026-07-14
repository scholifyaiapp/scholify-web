import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      /*
       * ACCA content loads ONE paper at a time (see src/lib/acca-content-registry.ts).
       * The content barrels import a bootstrap module that eagerly loads all fifteen
       * papers — correct for Node, where tsx scripts and vitest call the synchronous
       * getters from module scope and never await, and fatal in the browser, where it
       * would pull 4.5 MB of other papers' content back into the bundle.
       *
       * So the browser gets an empty stub. Vitest has its OWN config (vitest.config.ts)
       * and does not see this alias, which is exactly what we want: tests keep their
       * eagerly-populated registry. Must stay ABOVE the "@" prefix alias — the first
       * matching entry wins.
       */
      "@/lib/acca-content-boot": path.resolve(__dirname, "./src/lib/acca-content-boot.browser.ts"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["motion"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
})
