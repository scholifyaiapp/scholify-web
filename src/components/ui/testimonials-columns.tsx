import { Fragment } from "react"

export interface Testimonial {
  text: string
  image: string
  name: string
  role: string
}

interface ColumnProps {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}

function TestimonialsColumn({ className, testimonials, duration = 30 }: ColumnProps) {
  return (
    <div className={className}>
      <ul
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0 testimonials-scroll"
        style={{
          // CSS-driven scroll: runs purely on the compositor thread (GPU)
          animation: `testimonials-scroll ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {Array.from({ length: 2 }).map((_, copyIndex) => (
          <Fragment key={copyIndex}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <li
                key={`${copyIndex}-${i}`}
                aria-hidden={copyIndex === 1 ? "true" : "false"}
                tabIndex={copyIndex === 1 ? -1 : 0}
                className="p-7 rounded-2xl border border-neutral-200 shadow-sm shadow-black/5 max-w-xs w-full bg-white cursor-default select-none focus:outline-none focus:ring-2 focus:ring-[#5B5BF5]/30"
                style={{ contain: "layout paint" }}
              >
                <blockquote className="m-0 p-0">
                  <p className="text-neutral-700 leading-relaxed text-[15px] m-0">
                    {text}
                  </p>
                  <footer className="flex items-center gap-3 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={`Photo of ${name}`}
                      decoding="async"
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100"
                    />
                    <div className="flex flex-col">
                      <cite className="font-semibold not-italic tracking-tight leading-5 text-neutral-900 text-sm">
                        {name}
                      </cite>
                      <span className="text-xs leading-5 tracking-tight text-neutral-500 mt-0.5">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export interface TestimonialsColumnsProps {
  testimonials: Testimonial[]
  /** Pixel max-height for the masked scroll viewport. Defaults to 720. */
  maxHeight?: number
}

export function TestimonialsColumns({ testimonials, maxHeight = 720 }: TestimonialsColumnsProps) {
  const count = testimonials.length
  const per = Math.ceil(count / 3)
  const first = testimonials.slice(0, per)
  const second = testimonials.slice(per, per * 2)
  const third = testimonials.slice(per * 2)

  return (
    <div
      className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] overflow-hidden testimonials-viewport"
      role="region"
      aria-label="Learner testimonials"
      style={{ maxHeight, contain: "layout paint" }}
    >
      <TestimonialsColumn testimonials={first} duration={40} />
      <TestimonialsColumn testimonials={second} className="hidden md:block" duration={50} />
      <TestimonialsColumn testimonials={third} className="hidden lg:block" duration={45} />
    </div>
  )
}
