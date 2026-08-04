import { FormEvent, useEffect, useRef, useState } from "react"
import { Flag, Mic, MicOff, Send, Volume2, VolumeX, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import CharlesMascot from "@/components/CharlesMascot"
import { useT } from "@/i18n/LanguageProvider"

type Line = { role: "user" | "assistant"; text: string }
type SpeechRecognitionEventLike = { results: ArrayLike<{ 0: { transcript: string } }> }
type Recognition = { lang: string; interimResults: boolean; continuous: boolean; start: () => void; stop: () => void; onresult: ((event: SpeechRecognitionEventLike) => void) | null; onend: (() => void) | null; onerror: (() => void) | null }

const INTRO = "Hello, I'm Charles, your ACCA race engineer. Ask me how Scholify can help you pass your next paper."

export default function CharlesVoiceIntro() {
  const t = useT()
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [lines, setLines] = useState<Line[]>([{ role: "assistant", text: INTRO }])
  const [state, setState] = useState<"ready" | "listening" | "thinking" | "speaking">("ready")
  const [ambience, setAmbience] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recognitionRef = useRef<Recognition | null>(null)
  const ambienceRef = useRef<{ context: AudioContext; nodes: AudioNode[] } | null>(null)
  const conversationRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => () => {
    recognitionRef.current?.stop()
    audioRef.current?.pause()
    void ambienceRef.current?.context.close()
  }, [])

  useEffect(() => {
    conversationRef.current?.scrollTo({ top: conversationRef.current.scrollHeight, behavior: "smooth" })
  }, [lines, state])

  const stopSpeaking = () => {
    audioRef.current?.pause()
    audioRef.current = null
    setState("ready")
  }

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

  const sendMessage = async (rawMessage: string) => {
    const message = rawMessage.trim()
    if (!message || state === "thinking") return
    if (state === "speaking") stopSpeaking()
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

  const send = async (event?: FormEvent) => {
    event?.preventDefault()
    await sendMessage(input)
  }

  const listen = () => {
    if (state === "listening") return recognitionRef.current?.stop()
    if (state === "speaking") stopSpeaking()
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: new () => Recognition }).webkitSpeechRecognition
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = "en-GB"
    recognition.interimResults = false
    recognition.continuous = false
    let captured = ""
    recognition.onresult = (event) => {
      captured = event.results[0][0].transcript
      setInput(captured)
    }
    recognition.onend = () => {
      if (captured) void sendMessage(captured)
      else setState("ready")
    }
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
      <motion.button
        type="button"
        onClick={() => { setOpen(true); void speak(INTRO) }}
        className="fixed bottom-4 left-4 z-[90] flex items-center gap-2 rounded-full border border-white/20 bg-[#0B0B0F] py-2 pl-2 pr-4 text-left text-white shadow-[0_18px_60px_rgba(0,0,0,.38)] sm:bottom-6 sm:left-6"
        initial={{ opacity: 0, x: -30, scale: .8 }} animate={{ opacity: open ? 0 : 1, x: 0, scale: open ? .8 : 1 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: .96 }}
        aria-label={t("Talk with Charles")}
      >
        <motion.span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#C80000] to-[#E50068]" animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 0 rgba(200,0,0,.4)", "0 0 0 12px rgba(200,0,0,0)"] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <motion.span animate={reduceMotion ? undefined : { y: [0, -3, 0], rotate: [-2, 2, -2] }} transition={{ duration: 2.4, repeat: Infinity }}><CharlesMascot pose="wave" size={52} /></motion.span>
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0B0B0F] bg-[#2DD4BF]" />
        </motion.span>
        <span><strong className="block text-sm">{t("Talk with Charles")}</strong><span className="font-mono-pro text-[9px] tracking-[.12em] text-[#F4A405]">AI PIT WALL · ONLINE</span></span>
      </motion.button>

      <AnimatePresence>
      {open && <motion.div initial={{ opacity: 0, x: -28, y: 24, scale: .92 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} exit={{ opacity: 0, x: -20, y: 20, scale: .94 }} transition={{ type: "spring", damping: 24, stiffness: 280 }} className="fixed bottom-0 left-0 z-[100] flex max-h-[92dvh] w-full max-w-[430px] flex-col overflow-hidden rounded-t-[28px] bg-[#0B0B0F] text-white shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:bottom-6 sm:left-6 sm:rounded-[28px]" role="dialog" aria-modal="false" aria-label="Talk with Charles">
          <div className="race-grid-surface flex items-center gap-3 border-b border-white/10 p-4">
            <motion.div className="relative" animate={reduceMotion ? undefined : state === "speaking" ? { scale: [1, 1.08, .98, 1], rotate: [-2, 2, -1, -2] } : state === "thinking" ? { rotate: [0, 8, -8, 0] } : { y: [0, -3, 0] }} transition={{ duration: state === "speaking" ? .7 : 2, repeat: Infinity }}>
              <CharlesMascot pose={state === "thinking" ? "plan" : "thumbsup"} size={68} />
              <motion.span className="absolute inset-0 -z-10 rounded-full bg-[#C80000]/35 blur-xl" animate={{ scale: state === "speaking" ? [1, 1.45, 1] : [1, 1.15, 1], opacity: [.35, .7, .35] }} transition={{ duration: .8, repeat: Infinity }} />
            </motion.div>
            <div className="flex-1"><strong className="block">Charles · Scholify AI</strong><span className="font-mono-pro text-[10px] tracking-[.14em] text-[#F4A405]">{state === "listening" ? "RADIO LISTENING" : state === "thinking" ? "READING TELEMETRY" : state === "speaking" ? "CHARLES SPEAKING" : "PIT WALL ONLINE"}</span></div>
            <div className="flex h-8 items-center gap-1" aria-hidden>{[.45,.8,1,.65,.9,.4].map((height,index) => <motion.span key={index} className="w-1 rounded-full bg-[#F4A405]" animate={state === "speaking" || state === "listening" ? { height: [6, 24*height, 8] } : { height: 5 }} transition={{ duration: .45 + index*.06, repeat: Infinity, repeatType: "mirror" }} />)}</div>
            <button type="button" onClick={() => { stopSpeaking(); setOpen(false) }} className="rounded-full p-2 hover:bg-white/10" aria-label="Close"><X /></button>
          </div>
          <div ref={conversationRef} className="min-h-[220px] flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {lines.map((line, index) => <motion.div initial={{ opacity: 0, y: 8, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} key={index} className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${line.role === "assistant" ? "bg-white/10 text-white" : "ml-auto bg-[#C80000] text-white"}`}>{line.text}</motion.div>)}
            {state === "thinking" && <div className="flex gap-1 rounded-full bg-white/10 px-4 py-3 w-fit">{[0,1,2].map(i => <motion.span key={i} className="h-2 w-2 rounded-full bg-white/70" animate={{ y: [0,-5,0] }} transition={{ duration: .65, repeat: Infinity, delay: i*.12 }} />)}</div>}
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-white/55"><span>3 free radio messages per day</span><button type="button" onClick={() => void toggleAmbience()} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white">{ambience ? <Volume2 size={14} /> : <VolumeX size={14} />} Racing ambience</button></div>
            <form onSubmit={send} className="flex gap-2">
              <motion.button type="button" onClick={listen} animate={state === "listening" ? { scale: [1,1.12,1], boxShadow: ["0 0 0 0 rgba(244,164,5,.5)","0 0 0 12px rgba(244,164,5,0)"] } : {}} transition={{ duration: 1.2, repeat: Infinity }} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${state === "listening" ? "bg-[#F4A405] text-black" : state === "speaking" ? "bg-[#C80000] text-white" : "bg-white/10 text-white"}`} aria-label={state === "speaking" ? "Interrupt Charles" : "Use microphone"}>{state === "listening" ? <MicOff /> : <Mic />}</motion.button>
              <input value={input} onChange={(event) => setInput(event.target.value)} maxLength={280} placeholder="Ask Charles about Scholify…" className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#C80000]" />
              <button type="submit" disabled={!input.trim() || state === "thinking" || state === "speaking"} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C80000] text-white disabled:opacity-40" aria-label="Send"><Send size={18} /></button>
            </form>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] text-white/35"><Flag size={11} /> Fictional AI race engineer. Not affiliated with any real driver, team, or championship.</p>
          </div>
        </motion.div>}
      </AnimatePresence>
    </>
  )
}
