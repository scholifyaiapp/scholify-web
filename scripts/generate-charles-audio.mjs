import { mkdir, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const apiKey = process.env.FISH_API_KEY
if (!apiKey) {
  throw new Error("FISH_API_KEY is required. Add it to your shell environment and run this command again.")
}

/*
 * MUST stay identical to INTRO in src/components/CharlesVoiceIntro.tsx.
 *
 * It previously did not: this was a 60-word monologue while the widget showed a
 * one-line greeting, so opening the panel played an advert over the top of
 * different text. The widget now refuses to speak anything that is not the line
 * on screen, so if you change one of these two strings, change both and rerun
 * this script.
 */
const script = "Hey — I'm Charles. I help people get through ACCA papers. Which one are you on?"

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
