"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 Switch — binary toggle. Checked fill uses accent (CTA language).
 */
const switchVariants = cva(
  [
    "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/64",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=unchecked]:bg-muted-subtle data-[state=unchecked]:border-border",
    "data-[state=checked]:bg-accent",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-surface shadow-sm",
    "transition-transform duration-200 ease-out",
    "data-[state=unchecked]:translate-x-0.5",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5 data-[state=checked]:translate-x-[1.125rem]",
        md: "h-5 w-5 data-[state=checked]:translate-x-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(switchVariants({ size, className }))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch, switchVariants };
