import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 Skeleton — loading placeholder block.
 */
const skeletonVariants = cva("animate-pulse rounded-control bg-muted-subtle", {
  variants: {
    shape: {
      block: "",
      text: "h-4 w-full",
      circle: "rounded-full aspect-square",
    },
  },
  defaultVariants: {
    shape: "block",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, shape, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ shape, className }))}
      aria-hidden
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
