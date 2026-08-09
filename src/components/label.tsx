"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 Label — size / weight / tone + optional required marker.
 */
const labelVariants = cva(
  "inline-flex items-center gap-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        error: "text-destructive",
        warning: "text-warning",
        info: "text-info",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
      weight: {
        medium: "font-medium",
        normal: "font-normal",
        semibold: "font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      weight: "medium",
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /** Shows a destructive * after the label text (a11y: pair with aria-required on the control). */
  required?: boolean;
}

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, size, weight, required, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, size, weight, className }))}
    {...props}
  >
    {children}
    {required ? (
      <span className="text-destructive" aria-hidden>
        *
      </span>
    ) : null}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
