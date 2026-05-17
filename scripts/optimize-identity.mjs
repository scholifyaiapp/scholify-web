import sharp from "sharp"
import { stat, unlink } from "node:fs/promises"

// Add filenames here when you add new heavy images to public/
const files = [
  { src: "public/identity-before.png", out: "public/identity-before.webp", removeSrc: true },
  { src: "public/identity-after.png", out: "public/identity-after.webp", removeSrc: true },
  { src: "public/card-1.png", out: "public/card-1.webp", removeSrc: true },
  { src: "public/card-2.png", out: "public/card-2.webp", removeSrc: true },
  { src: "public/card-3.png", out: "public/card-3.webp", removeSrc: true },
  { src: "public/card-4.png", out: "public/card-4.webp", removeSrc: true },
  { src: "public/card-5.png", out: "public/card-5.webp", removeSrc: true },
  { src: "public/card-6.png", out: "public/card-6.webp", removeSrc: true },
]

for (const f of files) {
  try {
    const before = (await stat(f.src)).size
    await sharp(f.src)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(f.out)
    const after = (await stat(f.out)).size
    const pct = ((1 - after / before) * 100).toFixed(1)
    console.log(`${f.src} (${(before / 1024).toFixed(0)} KB) → ${f.out} (${(after / 1024).toFixed(0)} KB)  −${pct}%`)
    if (f.removeSrc) await unlink(f.src)
  } catch (err) {
    if ((err).code === "ENOENT") {
      console.log(`skip ${f.src} (not found)`)
    } else throw err
  }
}
