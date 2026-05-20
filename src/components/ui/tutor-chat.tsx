"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Target, Zap, Flame, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Brand tokens (kept in sync with Landing.tsx) ── */
const INK = "#14141A";
const INK_MUTED = "#6B6B76";
const CREAM = "#FAFAF7";
const BRAND_500 = "#5B5BF5";
const BRAND_100 = "#E8E8FF";
const PLUM_500 = "#A855F7";

const LARA_AVATAR =
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Lara&backgroundColor=ffd5dc,fde68a,c0aede&radius=50&eyes=variant10&hair=variant44&mouth=happy06";

type Role = "user" | "lara";
interface Message {
  id: string;
  role: Role;
  text: string;
}

const uid = () => Math.random().toString(36).slice(2, 10);

/* ── Mock reply engine — swap for a real backend later ── */
function getLaraReply(raw: string): string {
  const t = raw.toLowerCase();
  const has = (...words: string[]) => words.some((w) => t.includes(w));

  if (has("hello", "hey", "hi ", "good morning", "good evening") || t.trim() === "hi")
    return "Hey — good to see you here. I'm Lara, your learning partner. Tell me what you're working toward and I'll help you build the habit to actually get there. What are you learning right now?";

  if (has("plan", "schedule", "roadmap"))
    return "Let's build it. I need three things from you: (1) what you want to learn, (2) your deadline, and (3) how many minutes a day you can realistically give me. Share those and I'll turn them into a day-by-day plan you can actually keep.";

  if (has("explain", "what is", "how does", "understand", "concept", "teach me"))
    return "Happy to teach it. Drop the exact topic or question, and tell me your level — total beginner or just rusty. I'll explain it in plain language, give you one concrete example, then check you got it with a quick question.";

  if (has("quiz", "test me", "practice", "review", "flashcard"))
    return "Good instinct — recall is where real learning sticks. Tell me the subject and roughly what you've covered, and I'll fire off five short questions, one at a time. No grades, just reps. Ready?";

  if (has("stuck", "hard", "difficult", "confus", "don't get", "dont get", "lost"))
    return "That's a normal part of it — feeling stuck usually means you're right at the edge of learning something new. Tell me the exact spot you're stuck on and we'll break it into smaller pieces until one of them clicks.";

  if (has("motivat", "give up", "quit", "tired", "burn out", "burnt", "lazy", "can't do", "cant do"))
    return "I hear you. Here's the truth: most people quit by day 7 — if you're still showing up, you're already doing better than you think. You don't need motivation today, you need one small win. Give me 10 focused minutes on the tiniest task. What's the smallest next step you could take?";

  if (has("streak"))
    return "Streaks aren't about being perfect — they're about not letting one missed day become two. If you slip, your Life Shields protect the streak so you never start over. How's your streak looking today?";

  if (has("thank", "appreciate", "helpful"))
    return "Anytime — that's exactly what I'm here for. Showing up and asking is itself the habit. Come back tomorrow and we'll keep the momentum going.";

  if (has("bye", "see you", "later", "good night", "goodnight"))
    return "Go get some rest — you earned it. Same time tomorrow? Your future self is quietly counting on today's you.";

  return "Got it. Tell me a little more so I can genuinely help — what are you trying to learn, and what's getting in the way right now? The more specific you are, the more useful I can be.";
}

/* ── Quick-start prompts for the empty state ── */
const STARTERS = [
  { icon: Target, label: "Build me a study plan", prompt: "Can you build me a study plan?" },
  { icon: Zap, label: "Explain something I'm stuck on", prompt: "Explain a concept I'm stuck on." },
  { icon: Sparkles, label: "Quiz me on what I learned", prompt: "Quiz me on what I learned today." },
  { icon: Flame, label: "I'm losing motivation", prompt: "I'm losing motivation — help me stay on track." },
];

/* ── Lara avatar ── */
function Avatar({ size = 32 }: { size?: number }) {
  return (
    <img
      src={LARA_AVATAR}
      alt="Lara"
      width={size}
      height={size}
      className="shrink-0 rounded-full"
      style={{ background: BRAND_100, boxShadow: `0 0 0 1px ${BRAND_500}22` }}
    />
  );
}

/* ── Animated typing dots ── */
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block rounded-full"
          style={{ width: 6, height: 6, background: BRAND_500 }}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function TutorChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const busy = thinking || streamingId !== null;
  const empty = messages.length === 0;

  /* clean up pending timers on unmount */
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  /* keep the latest message in view */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  /* auto-grow the textarea */
  const grow = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  const respond = useCallback((userText: string) => {
    const reply = getLaraReply(userText);
    setThinking(true);

    const startDelay = window.setTimeout(() => {
      setThinking(false);
      const id = uid();
      setMessages((m) => [...m, { id, role: "lara", text: "" }]);
      setStreamingId(id);

      const words = reply.split(" ");
      let i = 0;
      const step = () => {
        i += 1;
        setMessages((m) =>
          m.map((msg) => (msg.id === id ? { ...msg, text: words.slice(0, i).join(" ") } : msg)),
        );
        if (i < words.length) {
          const t = window.setTimeout(step, 32 + Math.random() * 40);
          timers.current.push(t);
        } else {
          setStreamingId(null);
        }
      };
      step();
    }, 620);
    timers.current.push(startDelay);
  }, []);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || busy) return;
      setMessages((m) => [...m, { id: uid(), role: "user", text }]);
      setInput("");
      requestAnimationFrame(grow);
      respond(text);
    },
    [busy, grow, respond],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="flex h-full flex-col" style={{ background: CREAM }}>
      {/* ── Conversation ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-4 py-8">
          {empty ? (
            <motion.div
              className="flex flex-col items-center pt-[8vh] text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="relative">
                <div
                  className="absolute -inset-3 rounded-full blur-xl"
                  style={{ background: `${BRAND_500}26` }}
                />
                <img
                  src={LARA_AVATAR}
                  alt="Lara"
                  width={76}
                  height={76}
                  className="relative rounded-full"
                  style={{ background: BRAND_100, boxShadow: `0 0 0 4px ${CREAM}, 0 0 0 5px ${BRAND_500}33` }}
                />
              </div>
              <h2
                className="font-display mt-6 text-4xl"
                style={{ color: INK, letterSpacing: "-0.03em" }}
              >
                Hi — I'm Lara.
              </h2>
              <p className="mt-2 max-w-sm text-[15px]" style={{ color: INK_MUTED }}>
                Your AI learning partner. Ask me to explain something, build a plan,
                or just talk through what's slowing you down.
              </p>

              <div className="mt-8 grid w-full gap-2.5 sm:grid-cols-2">
                {STARTERS.map(({ icon: Icon, label, prompt }, i) => (
                  <motion.button
                    key={label}
                    type="button"
                    onClick={() => send(prompt)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left text-sm transition-colors"
                    style={{ borderColor: "#EAEAEF", color: INK }}
                  >
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-lg"
                      style={{ background: BRAND_100 }}
                    >
                      <Icon size={16} color={BRAND_500} />
                    </span>
                    {label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-5">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={cn(
                      "flex items-end gap-2.5",
                      m.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {m.role === "lara" && <Avatar />}
                    <div
                      className="max-w-[78%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed"
                      style={
                        m.role === "user"
                          ? { background: BRAND_500, color: CREAM, borderBottomRightRadius: 6 }
                          : { background: "#fff", color: INK, border: "1px solid #EAEAEF", borderBottomLeftRadius: 6 }
                      }
                    >
                      {m.text}
                      {streamingId === m.id && (
                        <span
                          className="ml-0.5 inline-block animate-pulse"
                          style={{ color: BRAND_500 }}
                        >
                          ▍
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {thinking && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2.5"
                >
                  <Avatar />
                  <div
                    className="rounded-2xl px-4 py-3.5"
                    style={{ background: "#fff", border: "1px solid #EAEAEF", borderBottomLeftRadius: 6 }}
                  >
                    <ThinkingDots />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      {/* ── Composer ── */}
      <div className="border-t" style={{ borderColor: "#EAEAEF", background: CREAM }}>
        <div className="mx-auto w-full max-w-2xl px-4 py-4">
          <div
            className="flex items-end gap-2 rounded-2xl border bg-white p-2 transition-colors"
            style={{ borderColor: focused ? BRAND_500 : "#EAEAEF" }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              rows={1}
              onChange={(e) => {
                setInput(e.target.value);
                grow();
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Ask Lara anything about your learning…"
              className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 text-[15px] outline-none placeholder:text-[#9A9AA3]"
              style={{ color: INK }}
            />
            <motion.button
              type="button"
              onClick={() => send(input)}
              disabled={!input.trim() || busy}
              whileTap={{ scale: 0.92 }}
              className="grid size-9 shrink-0 place-items-center rounded-xl transition-opacity disabled:opacity-35"
              style={{
                background: `linear-gradient(135deg, ${BRAND_500}, ${PLUM_500})`,
                color: CREAM,
              }}
              aria-label="Send message"
            >
              <ArrowUpIcon size={18} />
            </motion.button>
          </div>
          <p className="mt-2 text-center text-xs" style={{ color: INK_MUTED }}>
            Lara is a demo tutor — responses are illustrative for now.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TutorChat;
