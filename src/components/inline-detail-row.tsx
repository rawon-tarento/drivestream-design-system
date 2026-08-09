import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 InlineDetailRow — read-only label + value on one line (or stacked).
 * Density/alignment for preview cards and compact summaries.
 */
const inlineDetailRowVariants = cva("text-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
    layout: {
      inline: "flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5",
      stacked: "flex flex-col gap-0.5",
    },
  },
  defaultVariants: {
    size: "md",
    layout: "inline",
  },
});

const inlineDetailLabelVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
  },
});

const inlineDetailValueVariants = cva("text-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
    weight: {
      medium: "font-medium",
      normal: "font-normal",
      mono: "font-mono font-normal tracking-tight",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "medium",
  },
});

export interface InlineDetailRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineDetailRowVariants> {
  label: React.ReactNode;
  children: React.ReactNode;
  /** Value typography: medium (default) | normal | mono (ids / paths). */
  valueWeight?: VariantProps<typeof inlineDetailValueVariants>["weight"];
}

export function InlineDetailRow({
  label,
  children,
  className,
  size,
  layout,
  valueWeight = "medium",
  ...props
}: InlineDetailRowProps) {
  const isStacked = layout === "stacked";
  return (
    <div
      className={cn(inlineDetailRowVariants({ size, layout, className }))}
      {...props}
    >
      <span className={inlineDetailLabelVariants({ size })}>
        {label}
        {!isStacked ? <span aria-hidden>: </span> : null}
      </span>
      <span className={inlineDetailValueVariants({ size, weight: valueWeight })}>
        {children}
      </span>
    </div>
  );
}

export {
  inlineDetailRowVariants,
  inlineDetailLabelVariants,
  inlineDetailValueVariants,
};
