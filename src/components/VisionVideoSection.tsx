import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, X } from "lucide-react"

const ACCENT = "#5E0ED7"
const EASE = [0.22, 1, 0.36, 1] as const
const LINKS = ["Story", "Expertise", "Studios", "Feedback"]
const STATS = [
  { number: "300", label: "Crafted\nBrands" },
  { number: "200", label: "Digital\nProducts" },
  { number: "100", label: "Ventures\nFunded" },
]

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: EASE },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.12, duration: 0.6, ease: EASE },
  }),
}

function Mark() {
  return (
    <span
      aria-label="Scholify"
      className="grid h-8 w-8 place-items-center rounded-full border-2"
      style={{ borderColor: ACCENT }}
    >
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ACCENT }} />
    </span>
  )
}

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open navigation menu"
      className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full bg-black"
    >
      <span className="h-0.5 w-4 bg-white" />
      <span className="h-0.5 w-4 bg-white" />
      <span className="h-0.5 w-4 bg-white" />
    </button>
  )
}

export default function VisionVideoSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  return (
    <section
      aria-label="Fearless vision delivered"
      className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-white text-black"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <nav className="flex items-center justify-between px-5 pt-5 sm:px-8 md:px-12 md:pt-6" aria-label="Studio navigation">
        <motion.a href="#" custom={0} variants={fadeDown} initial="hidden" animate="visible">
          <Mark />
        </motion.a>

        <div className="hidden items-center gap-8 md:flex lg:gap-12">
          {LINKS.map((link, index) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              custom={index + 1}
              variants={fadeDown}
              initial="hidden"
              animate="visible"
              className="text-sm font-semibold uppercase tracking-widest text-black no-underline transition-opacity hover:opacity-60"
            >
              {link}
            </motion.a>
          ))}
        </div>

        <motion.div custom={5} variants={fadeDown} initial="hidden" animate="visible">
          <MenuButton onClick={() => setMenuOpen(true)} />
        </motion.div>
      </nav>

      <div className="flex flex-1 items-center justify-end px-5 py-8 sm:px-8 md:px-12 md:py-0">
        <div className="flex items-start gap-5 sm:gap-8 md:gap-10">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.number}
              custom={index + 2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-right"
            >
              <div className="whitespace-nowrap font-semibold leading-none" style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)" }}>
                <span style={{ color: ACCENT, fontSize: "0.5em", verticalAlign: "top" }}>+</span>
                {stat.number}
              </div>
              <p className="mt-2 whitespace-pre-line text-[10px] font-semibold uppercase leading-tight tracking-widest text-black sm:text-xs md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 px-5 pb-8 sm:px-8 md:gap-12 md:px-12 md:pb-12">
        <div className="flex items-center justify-between gap-4">
          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-[130px] text-[10px] font-semibold uppercase tracking-widest sm:max-w-[160px] sm:text-xs md:max-w-xs md:text-sm"
          >
            Shaping Bold<br />Visions Into Power<br />For Your Tribe
          </motion.p>
          <motion.a
            href="#feedback"
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 whitespace-nowrap text-base font-semibold uppercase tracking-wide no-underline sm:text-xl md:text-2xl"
            style={{ color: ACCENT }}
          >
            Work With Us <ArrowUpRight className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
          </motion.a>
        </div>

        <div className="flex items-end justify-between gap-3 sm:gap-4">
          <motion.div
            custom={7}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-[120px] shrink-0 sm:w-[180px] md:w-[280px]"
          >
            <p className="text-left text-[9px] font-semibold uppercase tracking-widest sm:text-xs md:text-right md:text-sm">
              Creative Studios Built Around Elevating Your Vision Into Striking Reality
            </p>
          </motion.div>

          <h2 className="text-right font-semibold uppercase tracking-wide" style={{ fontSize: "clamp(2rem, 9vw, 9rem)", lineHeight: 0.88 }}>
            {["Fearless", "Vision", "Delivered"].map((word, index) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 + index * 0.14, duration: 0.7, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-white px-5 pb-8 pt-5 text-black sm:px-8 md:px-12 md:pb-12 md:pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <Mark />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="grid h-9 w-9 place-items-center rounded-full bg-black text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-16 flex flex-col gap-8">
              {LINKS.map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-semibold uppercase tracking-widest text-black no-underline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.4, ease: EASE }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
            <a href="#feedback" onClick={() => setMenuOpen(false)} className="mt-auto flex items-center gap-2 text-xl font-semibold uppercase tracking-wide no-underline" style={{ color: ACCENT }}>
              Work With Us <ArrowUpRight size={22} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
