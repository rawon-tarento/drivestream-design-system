import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 Card — elevation / bordered / interactive surface.
 *
 * Prefer composing CardHeader / CardTitle / CardDescription / CardContent / CardFooter.
 */
const cardVariants = cva(
  [
    "rounded-card border bg-surface text-card-foreground",
    "transition-[border-color,box-shadow,background-color] duration-200 ease-out",
  ].join(" "),
  {
    variants: {
      variant: {
        // Border-only: use solid status colors (not pale *-border tokens) so
        // variants stay visible and WCAG-distinguishable on white/surface.
        default: "border border-border",
        accent: "border border-accent",
        success: "border border-success",
        warning: "border border-warning",
        critical: "border border-destructive",
      },
      elevation: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
      },
      interactive: {
        true: [
          "cursor-pointer",
          "hover:bg-surface-hover hover:border-border-strong",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/64",
        ].join(" "),
        false: "",
      },
      padded: {
        true: "p-section",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      elevation: "sm",
      interactive: false,
      padded: true,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      elevation,
      interactive,
      padded,
      tabIndex,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, elevation, interactive, padded, className })
      )}
      tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-gap-tight pb-stack-lg", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-heading-2 leading-tight tracking-tight text-primary", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-gap-tight pt-stack-sm",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
