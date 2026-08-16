import { mkdir, writeFile } from "node:fs/promises"
import { spawn } from "node:child_process"
import { setTimeout as delay } from "node:timers/promises"

const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
const baseUrl = process.env.AUDIT_BASE_URL || "http://127.0.0.1:4188"
const outputDir = process.env.AUDIT_OUTPUT_DIR || "audit-results"
const widths = (process.env.AUDIT_WIDTHS || "320,375,768,1024,1440").split(",").map(Number)
const port = 9333

await mkdir(outputDir, { recursive: true })
const chrome = spawn(chromePath, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`,
  "--user-data-dir=" + `${outputDir}/chrome-profile`, "about:blank",
], { stdio: "ignore" })

async function target() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((res) => res.json())
      const page = targets.find((item) => item.type === "page")
      if (page) return page
    } catch { /* Chrome is still starting. */ }
    await delay(100)
  }
  throw new Error("Chrome DevTools endpoint did not start")
}

const page = await target()
const socket = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
let id = 0
const pending = new Map()
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data)
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(message.error.message))
    else resolve(message.result)
  }
}
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const messageId = ++id
  pending.set(messageId, { resolve, reject })
  socket.send(JSON.stringify({ id: messageId, method, params }))
})

try {
  await send("Page.enable")
  for (const width of widths) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 })
    await send("Page.navigate", { url: baseUrl })
    await delay(2500)
    const metrics = await send("Runtime.evaluate", {
      expression: "JSON.stringify({innerWidth,scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})",
      returnByValue: true,
    })
    const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true })
    await writeFile(`${outputDir}/landing-${width}.png`, Buffer.from(screenshot.data, "base64"))
    console.log(width, metrics.result.value)
  }
} finally {
  socket.close()
  chrome.kill()
}
