import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", "coverage/**", "public/**", "**/*.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}", "api/**/*.ts", "tests/**/*.ts", "scripts/**/*.{ts,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-useless-assignment": "off",
      "no-control-regex": "off",
      "no-constant-condition": "warn",
      "prefer-const": "warn",
    },
  },
  {
    files: ["src/lib/acca-content-*.ts", "src/lib/acca-questions-*.ts", "src/lib/acca-study-*.ts"],
    rules: {
      // Authored curriculum data intentionally exports large declarative object
      // graphs; React module-boundary and hook rules do not apply there.
      "react-hooks/rules-of-hooks": "off",
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["scripts/**/*.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
)
