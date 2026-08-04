import { useEffect, useRef, useState } from "react"
import { Pause, Play, RotateCcw, Volume2 } from "lucide-react"
import CharlesMascot from "@/components/CharlesMascot"
import { useT } from "@/i18n/LanguageProvider"

const CHARLES_INTRO_AUDIO = "/audio/charles-scholify-intro.mp3"

export default function CharlesVoiceIntro() {
  const t = useT()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [finished, setFinished] = useState(false)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    return () => audio?.pause()
  }, [])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    setUnavailable(false)
    try {
      if (playing) {
        audio.pause()
      } else {
        if (finished) audio.currentTime = 0
        await audio.play()
      }
    } catch {
      setPlaying(false)
      setUnavailable(true)
    }
  }

  return (
    <div
      className="mx-auto mt-5 flex w-full max-w-[560px] items-center gap-3 rounded-2xl border border-black/10 bg-white/75 p-3 text-left shadow-[0_14px_35px_-28px_rgba(20,20,26,.7)] backdrop-blur-md sm:gap-4 sm:p-4"
      aria-label={t("Charles's introduction to Scholify")}
    >
      <div className="hidden shrink-0 sm:block" aria-hidden>
        <CharlesMascot pose="wave" size={70} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Volume2 size={15} className="shrink-0 text-[#C80000]" aria-hidden />
          <strong className="text-sm text-[#14141A]">{t("Meet Charles")}</strong>
          <span className="font-mono-pro text-[9px] tracking-[.14em] text-[#C80000]">{t("AI RACE ENGINEER")}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#6B6B76] sm:text-[13px]">
          {t("Hear how Charles turns your ACCA weak spots into a focused daily plan.")}
        </p>
        {unavailable && (
          <p role="status" className="mt-1 text-xs text-[#C80000]">
            {t("Charles's introduction is temporarily unavailable.")}
          </p>
        )}
      </div>
      <audio
        ref={audioRef}
        src={CHARLES_INTRO_AUDIO}
        preload="metadata"
        onPlay={() => { setPlaying(true); setFinished(false) }}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setFinished(true) }}
        onError={() => setUnavailable(true)}
      >
        {t("Your browser does not support audio playback.")}
      </audio>
      <button
        type="button"
        onClick={togglePlayback}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14141A] text-white shadow-md transition hover:bg-[#C80000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C80000] focus-visible:ring-offset-2"
        aria-label={t(playing ? "Pause Charles's introduction" : finished ? "Replay Charles's introduction" : "Play Charles's introduction")}
      >
        {playing ? <Pause size={18} fill="currentColor" /> : finished ? <RotateCcw size={18} /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
      </button>
    </div>
  )
}
