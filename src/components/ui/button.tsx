import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 active:scale-[0.97] hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-gradient-hero text-primary-foreground shadow-lg hover:shadow-2xl hover:brightness-110 shine border-glow [&:hover_svg]:scale-110",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg [&:hover_svg]:wiggle",
        outline: "border-2 border-border/50 bg-transparent backdrop-blur-sm hover:bg-muted/30 hover:border-primary/50 hover:shadow-lg [&:hover_svg]:scale-110",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-xl border-glow [&:hover_svg]:scale-110",
        ghost: "hover:bg-muted/50 hover:text-foreground [&:hover_svg]:scale-110",
        link: "text-primary underline-offset-4 hover:underline [&:hover_svg]:translate-x-0.5",
        emergency: "bg-gradient-to-r from-accent to-accent-dark text-accent-foreground shadow-xl glow-accent font-bold [&:hover_svg]:scale-125",
        success: "bg-gradient-to-r from-secondary to-secondary-dark text-secondary-foreground shadow-lg hover:shadow-2xl shine border-glow [&:hover_svg]:scale-110",
        calm: "bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30 backdrop-blur-sm hover:shadow-md [&:hover_svg]:scale-110",
        glass: "glass hover:bg-card/50 text-foreground shadow-glass hover:shadow-elevated shine [&:hover_svg]:scale-110",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg font-bold",
        icon: "h-11 w-11",
        "icon-lg": "h-14 w-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
