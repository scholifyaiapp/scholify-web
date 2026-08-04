import { FormEvent, useEffect, useRef, useState } from "react"
import { Flag, Mic, MicOff, Send, Volume2, VolumeX, X } from "lucide-react"
import CharlesMascot from "@/components/CharlesMascot"
import { useT } from "@/i18n/LanguageProvider"

type Line = { role: "user" | "assistant"; text: string }
type SpeechRecognitionEventLike = { results: ArrayLike<{ 0: { transcript: string } }> }
type Recognition = { lang: string; interimResults: boolean; continuous: boolean; start: () => void; stop: () => void; onresult: ((event: SpeechRecognitionEventLike) => void) | null; onend: (() => void) | null; onerror: (() => void) | null }

const INTRO = "Hello, I'm Charles, your ACCA race engineer. Ask me how Scholify can help you pass your next paper."

export default function CharlesVoiceIntro() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [lines, setLines] = useState<Line[]>([{ role: "assistant", text: INTRO }])
  const [state, setState] = useState<"ready" | "listening" | "thinking" | "speaking">("ready")
  const [ambience, setAmbience] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recognitionRef = useRef<Recognition | null>(null)
  const ambienceRef = useRef<{ context: AudioContext; nodes: AudioNode[] } | null>(null)

  useEffect(() => () => {
    recognitionRef.current?.stop()
    audioRef.current?.pause()
    void ambienceRef.current?.context.close()
  }, [])

  const speak = async (text: string, voiceToken?: string) => {
    setState("speaking")
    try {
      if (!voiceToken) {
        const audio = new Audio("/audio/charles-scholify-intro.mp3")
        audioRef.current = audio
        audio.onended = () => setState("ready")
        audio.onerror = () => setState("ready")
        await audio.play()
        return
      }
      const response = await fetch("/api/lara?action=landing-voice-tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, voiceToken }) })
      if (!response.ok) throw new Error("voice")
      const url = URL.createObjectURL(await response.blob())
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { URL.revokeObjectURL(url); setState("ready") }
      audio.onerror = () => { URL.revokeObjectURL(url); setState("ready") }
      await audio.play()
    } catch {
      setState("ready")
    }
  }

  const send = async (event?: FormEvent) => {
    event?.preventDefault()
    const message = input.trim()
    if (!message || state === "thinking" || state === "speaking") return
    const history = lines.slice(-4)
    setLines((current) => [...current, { role: "user", text: message }])
    setInput("")
    setState("thinking")
    try {
      const response = await fetch("/api/lara?action=landing-voice-chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, history }) })
      const data = await response.json() as { answer?: string; error?: string; voiceToken?: string }
      const answer = data.answer || data.error || "Radio interference. Try again in a moment."
      setLines((current) => [...current, { role: "assistant", text: answer }])
      if (response.ok) await speak(answer, data.voiceToken)
      else setState("ready")
    } catch {
      setLines((current) => [...current, { role: "assistant", text: "Radio interference. Try again in a moment." }])
      setState("ready")
    }
  }

  const listen = () => {
    if (state === "listening") return recognitionRef.current?.stop()
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: new () => Recognition }).webkitSpeechRecognition
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = "en-GB"
    recognition.interimResults = false
    recognition.continuous = false
    recognition.onresult = (event) => setInput(event.results[0][0].transcript)
    recognition.onend = () => setState("ready")
    recognition.onerror = () => setState("ready")
    recognitionRef.current = recognition
    setState("listening")
    recognition.start()
  }

  const toggleAmbience = async () => {
    if (ambienceRef.current) {
      await ambienceRef.current.context.close()
      ambienceRef.current = null
      setAmbience(false)
      return
    }
    const context = new AudioContext()
    const master = context.createGain(); master.gain.value = 0.025; master.connect(context.destination)
    const nodes: AudioNode[] = [master]
    for (const [frequency, gainValue] of [[48, .55], [73, .22], [112, .1]] as const) {
      const oscillator = context.createOscillator(); const gain = context.createGain()
      oscillator.type = "sawtooth"; oscillator.frequency.value = frequency; gain.gain.value = gainValue
      oscillator.connect(gain); gain.connect(master); oscillator.start(); nodes.push(oscillator, gain)
    }
    ambienceRef.current = { context, nodes }
    setAmbience(true)
  }

  return (
    <>
      <button type="button" onClick={() => { setOpen(true); void speak(INTRO) }} className="mx-auto mt-5 flex w-full max-w-[560px] items-center gap-3 rounded-2xl border border-black/10 bg-white/80 p-3 text-left shadow-[0_14px_35px_-28px_rgba(20,20,26,.7)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#C80000]/30 sm:p-4">
        <CharlesMascot pose="wave" size={66} />
        <span className="min-w-0 flex-1"><strong className="block text-sm text-[#14141A]">{t("Talk with Charles")}</strong><span className="mt-1 block text-xs leading-5 text-[#6B6B76]">{t("Ask Scholify's fictional AI race engineer anything about your ACCA comeback plan.")}</span></span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C80000] text-white"><Mic size={19} /></span>
      </button>

      {open && <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label="Talk with Charles">
        <div className="relative flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-[28px] bg-[#0B0B0F] text-white shadow-2xl sm:rounded-[28px]">
          <div className="race-grid-surface flex items-center gap-3 border-b border-white/10 p-4">
            <CharlesMascot pose="thumbsup" size={62} />
            <div className="flex-1"><strong className="block">Charles · Scholify AI</strong><span className="font-mono-pro text-[10px] tracking-[.14em] text-[#F4A405]">{state === "listening" ? "RADIO LISTENING" : state === "thinking" ? "READING TELEMETRY" : state === "speaking" ? "CHARLES SPEAKING" : "PIT WALL ONLINE"}</span></div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/10" aria-label="Close"><X /></button>
          </div>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {lines.map((line, index) => <div key={index} className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${line.role === "assistant" ? "bg-white/10 text-white" : "ml-auto bg-[#C80000] text-white"}`}>{line.text}</div>)}
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-white/55"><span>3 free radio messages per day</span><button type="button" onClick={() => void toggleAmbience()} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white">{ambience ? <Volume2 size={14} /> : <VolumeX size={14} />} Racing ambience</button></div>
            <form onSubmit={send} className="flex gap-2">
              <button type="button" onClick={listen} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${state === "listening" ? "bg-[#F4A405] text-black" : "bg-white/10 text-white"}`} aria-label="Use microphone">{state === "listening" ? <MicOff /> : <Mic />}</button>
              <input value={input} onChange={(event) => setInput(event.target.value)} maxLength={280} placeholder="Ask Charles about Scholify…" className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#C80000]" />
              <button type="submit" disabled={!input.trim() || state === "thinking" || state === "speaking"} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C80000] text-white disabled:opacity-40" aria-label="Send"><Send size={18} /></button>
            </form>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] text-white/35"><Flag size={11} /> Fictional AI race engineer. Not affiliated with any real driver, team, or championship.</p>
          </div>
        </div>
      </div>}
    </>
  )
}
