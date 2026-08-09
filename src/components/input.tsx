import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 Input — comfortable-compact field.
 *
 * Preferred API:
 *   variant: default | error
 *   size:    sm | md | lg
 *   startAdornment / endAdornment — optional inline slots
 *
 * `aria-invalid` also applies error styles when set.
 */
const inputVariants = cva(
  [
    "flex w-full items-center rounded-input border bg-input-background",
    "text-input-foreground placeholder:text-input-placeholder",
    "transition-[border-color,box-shadow] duration-200 ease-out",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:bg-input-background-disabled disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-input-border",
          "hover:border-input-border-hover",
          // Soft focus: border shift + thin tinted ring, no offset gap
          "focus-visible:border-input-border-focus focus-visible:ring-1 focus-visible:ring-ring/64",
        ].join(" "),
        error: [
          "border-input-border-error",
          "focus-visible:border-input-border-error focus-visible:ring-1 focus-visible:ring-ring-error/64",
        ].join(" "),
      },
      size: {
        sm: "h-9 px-control-md text-xs",
        md: "h-11 px-control-lg py-control-sm text-sm",
        lg: "h-12 px-control-lg py-control-md text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

function resolveVariant(
  variant: InputProps["variant"],
  ariaInvalid: InputProps["aria-invalid"]
): NonNullable<InputProps["variant"]> {
  if (variant === "error") return "error";
  if (ariaInvalid === true || ariaInvalid === "true") return "error";
  return variant ?? "default";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      size,
      startAdornment,
      endAdornment,
      "aria-invalid": ariaInvalid,
      disabled,
      ...props
    },
    ref
  ) => {
    const resolved = resolveVariant(variant, ariaInvalid);
    const input = (
      <input
        type={type}
        suppressHydrationWarning
        disabled={disabled}
        aria-invalid={ariaInvalid}
        className={cn(
          inputVariants({ variant: resolved, size }),
          startAdornment && "pl-10",
          endAdornment && "pr-11",
          className
        )}
        ref={ref}
        {...props}
      />
    );

    if (!startAdornment && !endAdornment) {
      return input;
    }

    return (
      <div className="relative w-full">
        {startAdornment ? (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-icon-muted [&_svg]:h-4 [&_svg]:w-4">
            {startAdornment}
          </span>
        ) : null}
        {input}
        {endAdornment ? (
          <span className="absolute right-1 top-1/2 z-10 -translate-y-1/2 text-icon-muted [&_svg]:h-4 [&_svg]:w-4">
            {endAdornment}
          </span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
