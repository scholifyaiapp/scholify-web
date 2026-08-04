import { mkdir, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const apiKey = process.env.FISH_API_KEY
if (!apiKey) {
  throw new Error("FISH_API_KEY is required. Add it to your shell environment and run this command again.")
}

const script = "Hello, I'm Charles, your ACCA race engineer at Scholify. Start with a quick diagnosis, and I'll find where you're losing marks, build your focused daily plan, and keep adapting it as you improve. You always know what to study next, why it matters, and how close you are to passing. Ready? Let's build your comeback plan."

const response = await fetch("https://api.fish.audio/v1/tts", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    model: "s2.1-pro-free",
  },
  body: JSON.stringify({
    text: script,
    reference_id: process.env.FISH_CHARLES_VOICE_ID || "802e3bc2b27e49c2995d23ef70e6ac89",
    format: "mp3",
    prosody: { speed: 1.02, volume: 0, normalize_loudness: true },
    normalize: true,
    mp3_bitrate: 128,
  }),
})

if (!response.ok) {
  const detail = await response.text()
  throw new Error(`Fish Audio returned ${response.status}: ${detail.slice(0, 500)}`)
}

const outputDirectory = resolve("public", "audio")
const outputPath = resolve(outputDirectory, "charles-scholify-intro.mp3")
await mkdir(outputDirectory, { recursive: true })
await writeFile(outputPath, Buffer.from(await response.arrayBuffer()))
console.log(`Generated ${outputPath}`)
