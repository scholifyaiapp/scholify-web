/*
 * Regenerate the raster brand icons from the master mark (public/logo.svg).
 *   node scripts/make-brand-icons.mjs
 *
 *   favicon.png   48×48   bare mark, transparent
 *   icon-192.png  192×192 app icon — mark at ~68% on off-white, rounded
 *   icon-512.png  512×512 same at scale
 */
import sharp from "sharp"
import { readFileSync, writeFileSync } from "node:fs"

const mark = readFileSync("public/logo.svg", "utf8")

// App-icon variant: off-white rounded square, mark centered at 68%.
const appIcon = (size) => {
  const inset = Math.round(size * 0.16)
  const inner = size - inset * 2
  const radius = Math.round(size * 0.2)
  const innerSvg = mark.replace('viewBox="0 0 200 200"', `viewBox="0 0 200 200" width="${inner}" height="${inner}" x="${inset}" y="${inset}"`)
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${radius}" fill="#FAFAF7"/>
    ${innerSvg.replace(/<\?xml[^>]*\?>/, "")}
  </svg>`
}

const density = 300

await sharp(Buffer.from(mark), { density }).resize(48, 48).png().toFile("public/favicon.png")
for (const size of [192, 512]) {
  await sharp(Buffer.from(appIcon(size)), { density }).resize(size, size).png().toFile(`public/icon-${size}.png`)
}
console.log("brand icons written: favicon.png, icon-192.png, icon-512.png")
