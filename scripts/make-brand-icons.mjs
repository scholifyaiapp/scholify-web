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

// favicon.ico — ICO container with PNG-encoded 16/32/48 entries (Vista+
// format). Browsers request /favicon.ico unprompted; without a real file
// the SPA rewrite serves HTML and the tab icon silently breaks.
const icoSizes = [16, 32, 48]
const pngs = []
for (const size of icoSizes) {
  pngs.push(await sharp(Buffer.from(mark), { density }).resize(size, size).png().toBuffer())
}
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(icoSizes.length, 4)
const entries = []
let offset = 6 + 16 * icoSizes.length
icoSizes.forEach((size, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(size === 256 ? 0 : size, 0) // width
  e.writeUInt8(size === 256 ? 0 : size, 1) // height
  e.writeUInt8(0, 2) // palette
  e.writeUInt8(0, 3) // reserved
  e.writeUInt16LE(1, 4) // color planes
  e.writeUInt16LE(32, 6) // bits per pixel
  e.writeUInt32LE(pngs[i].length, 8)
  e.writeUInt32LE(offset, 12)
  offset += pngs[i].length
  entries.push(e)
})
writeFileSync("public/favicon.ico", Buffer.concat([header, ...entries, ...pngs]))
// OG share image — 1200×630, warm paper, mark + wordmark + tagline.
const og = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630">
  <rect width="1200" height="630" fill="#FAFAF7"/>
  <circle cx="1080" cy="80" r="340" fill="rgba(200,0,0,0.06)"/>
  <circle cx="120" cy="590" r="300" fill="rgba(244,164,5,0.07)"/>
  ${mark.replace('viewBox="0 0 200 200"', 'viewBox="0 0 200 200" width="170" height="170" x="90" y="120"').replace(/<\?xml[^>]*\?>/, "")}
  <text x="90" y="400" font-family="Arial, sans-serif" font-weight="800" font-size="86" fill="#14141A" letter-spacing="-3">Scholify</text>
  <text x="90" y="462" font-family="Arial, sans-serif" font-weight="600" font-size="34" fill="#5F584F">The Learning OS for ACCA</text>
  <text x="90" y="530" font-family="monospace" font-weight="600" font-size="22" fill="#C80000" letter-spacing="4">KNOW YOU'LL PASS BEFORE YOU SIT</text>
  <rect x="0" y="622" width="1200" height="8" fill="#C80000"/>
</svg>`
await sharp(Buffer.from(og), { density: 150 }).png().toFile("public/og-image.png")
console.log("brand icons written: favicon.png, favicon.ico (16/32/48), icon-192.png, icon-512.png, og-image.png")
