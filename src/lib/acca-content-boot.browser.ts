/*
 * The BROWSER build of the ACCA content bootstrap: deliberately empty.
 *
 * vite.config.ts aliases "@/lib/acca-content-boot" to this file for `vite dev`
 * and `vite build`. The real boot module eagerly loads all fifteen papers, which
 * is right for Node (tsx scripts + vitest call the synchronous getters straight
 * from module scope and never await) and catastrophic for a student on 4G — it is
 * the very thing this refactor removed. In the browser, content arrives one paper
 * at a time through usePaperContent().
 *
 * Doing it with an alias rather than a runtime `if` also keeps the real boot's
 * top-level await out of the bundle: the build targets es2020 / safari14, which
 * has no TLA.
 */
export {}
