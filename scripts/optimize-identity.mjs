import sharp from "sharp"
import { stat } from "node:fs/promises"

const files = [
  { src: "public/identity-before.png", out: "public/identity-before.webp" },
  { src: "public/identity-after.png", out: "public/identity-after.webp" },
]

for (const f of files) {
  const before = (await stat(f.src)).size
  await sharp(f.src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(f.out)
  const after = (await stat(f.out)).size
  const pct = ((1 - after / before) * 100).toFixed(1)
  console.log(`${f.src} (${(before / 1024).toFixed(0)} KB) → ${f.out} (${(after / 1024).toFixed(0)} KB)  −${pct}%`)
}
