import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * L1 Spinner — indeterminate progress indicator (pairs with deferred Button loading).
 */
const spinnerVariants = cva("animate-spin text-accent", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label; defaults to "Loading". */
  label?: string;
}

function Spinner({ className, size, label = "Loading", ...props }: SpinnerProps) {
  return (
    <Loader2
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size, className }))}
      {...props}
    />
  );
}

export { Spinner, spinnerVariants };
