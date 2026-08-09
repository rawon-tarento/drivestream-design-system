import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 Button — accent CTA (`variant="primary"` maps to accent semantics), comfortable-compact density.
 *
 * Preferred API:
 *   variant: primary | secondary | ghost | critical | critical-soft | success | success-soft
 *   size:    sm | md | lg | icon
 *
 * No loading prop (deferred). Use disabled for in-flight if needed.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-button font-semibold",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover active:bg-accent-pressed",
        secondary:
          "border border-accent-border bg-transparent text-accent hover:bg-accent hover:text-accent-foreground active:bg-accent-pressed active:text-accent-foreground",
        ghost:
          "bg-transparent text-foreground hover:bg-surface-hover active:bg-surface-pressed",
        critical:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover active:bg-destructive-pressed",
        "critical-soft":
          "border border-destructive-border bg-transparent text-destructive hover:bg-destructive-subtle active:bg-destructive-subtle",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success-hover active:bg-success-hover",
        "success-soft":
          "border border-success-border bg-transparent text-success hover:bg-success-subtle active:bg-success-subtle",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 py-2 text-sm",
        lg: "h-12 px-8 text-base",
        /** Square-ish control for icon-only buttons; keep label empty / aria-label required. */
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
