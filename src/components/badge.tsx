import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 Badge — status / meta chip.
 *
 * Preferred API:
 *   variant:     neutral | critical | success | warning | info
 *   appearance:  filled | outlined
 *   size:        sm | md
 *
 * Filled uses subtle surfaces (chip-like). Outlined uses border + muted text.
 */
const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 whitespace-nowrap",
    "rounded-badge border font-semibold leading-none",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/64",
  ].join(" "),
  {
    variants: {
      variant: {
        neutral: "",
        critical: "",
        success: "",
        warning: "",
        info: "",
      },
      appearance: {
        filled: "",
        outlined: "",
      },
      size: {
        sm: "h-5 px-control-xs text-xs",
        md: "h-6 px-control-sm text-xs",
      },
    },
    compoundVariants: [
      {
        variant: "neutral",
        appearance: "filled",
        class: "border-transparent bg-secondary-subtle text-muted-foreground",
      },
      {
        variant: "neutral",
        appearance: "outlined",
        class: "border-secondary-border bg-transparent text-muted-foreground",
      },
      {
        variant: "critical",
        appearance: "filled",
        class: "border-transparent bg-destructive-subtle text-destructive-muted",
      },
      {
        variant: "critical",
        appearance: "outlined",
        class: "border-destructive-border bg-transparent text-destructive-muted",
      },
      {
        variant: "success",
        appearance: "filled",
        class: "border-transparent bg-success-subtle text-success-muted",
      },
      {
        variant: "success",
        appearance: "outlined",
        class: "border-success-border bg-transparent text-success-muted",
      },
      {
        variant: "warning",
        appearance: "filled",
        class: "border-transparent bg-warning-subtle text-warning-muted",
      },
      {
        variant: "warning",
        appearance: "outlined",
        class: "border-warning-border bg-transparent text-warning-muted",
      },
      {
        variant: "info",
        appearance: "filled",
        class: "border-transparent bg-info-subtle text-info-muted",
      },
      {
        variant: "info",
        appearance: "outlined",
        class: "border-info-border bg-transparent text-info-muted",
      },
    ],
    defaultVariants: {
      variant: "neutral",
      appearance: "filled",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, appearance, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, appearance, size, className }))}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
