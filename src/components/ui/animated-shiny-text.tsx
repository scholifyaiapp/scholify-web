import * as React from "react"
import { motion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  gradientColors?: string
  gradientAnimationDuration?: number
  hoverEffect?: boolean
  className?: string
  textClassName?: string
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = "linear-gradient(90deg, #14141A 0%, #5B5BF5 40%, #A855F7 50%, #5B5BF5 60%, #14141A 100%)",
      gradientAnimationDuration = 3,
      hoverEffect = false,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const textVariants: Variants = {
      initial: { backgroundPosition: "0% 0" },
      animate: {
        backgroundPosition: "200% 0",
        transition: {
          duration: gradientAnimationDuration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        },
      },
    }

    return (
      <div
        ref={ref}
        className={cn("flex justify-center items-center", className)}
        {...props}
      >
        <motion.h1
          className={cn(
            "text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-tight",
            textClassName,
          )}
          style={{
            backgroundImage: gradientColors,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            textShadow: isHovered ? "0 0 12px rgba(91,91,245,0.35)" : "none",
            willChange: "background-position",
          }}
          variants={textVariants}
          initial="initial"
          animate="animate"
          onHoverStart={() => hoverEffect && setIsHovered(true)}
          onHoverEnd={() => hoverEffect && setIsHovered(false)}
        >
          {text}
        </motion.h1>
      </div>
    )
  },
)

AnimatedText.displayName = "AnimatedText"

export { AnimatedText }
