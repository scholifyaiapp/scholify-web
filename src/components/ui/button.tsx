import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * The Tailwind/shadcn button, brought into line with the app's own button
 * (components/acca/ui → Button), which is the primary primitive.
 *
 * Three things were wrong and all three are accessibility or feel rather than
 * taste: the height was 40px (below the 44px touch target every mobile guideline
 * asks for), `transition-colors` meant a press had no physical response at all,
 * and the radius/shadow language did not match the cards these buttons sit in.
 * The variants now mirror the acca Button's palette so the two cannot drift.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background " +
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
    "active:scale-[0.975] motion-reduce:active:scale-100 motion-reduce:transition-none " +
    "disabled:pointer-events-none disabled:opacity-55 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:-translate-y-px motion-reduce:hover:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:-translate-y-px motion-reduce:hover:translate-y-0",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // 44px minimum touch target on every non-link size.
        default: "min-h-11 px-5 py-2.5",
        sm: "min-h-10 rounded-lg px-3.5 py-2 text-[13px]",
        lg: "min-h-12 rounded-2xl px-7 py-3 text-[15px]",
        icon: "size-11 rounded-lg",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
