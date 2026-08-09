import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 Textarea — same variant/size model as Input.
 *
 * Preferred API:
 *   variant: default | error
 *   size:    sm | md | lg
 *
 * `aria-invalid` also applies error styles when set.
 */
const textareaVariants = cva(
  [
    "flex w-full rounded-input border bg-input-background",
    "text-input-foreground placeholder:text-input-placeholder",
    "transition-[border-color,box-shadow] duration-200 ease-out",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:bg-input-background-disabled disabled:opacity-50",
    "resize-y",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-input-border",
          "hover:border-input-border-hover",
          "focus-visible:border-input-border-focus focus-visible:ring-1 focus-visible:ring-ring/64",
        ].join(" "),
        error: [
          "border-input-border-error",
          "focus-visible:border-input-border-error focus-visible:ring-1 focus-visible:ring-ring-error/64",
        ].join(" "),
      },
      size: {
        sm: "min-h-16 px-control-md py-control-sm text-xs",
        md: "min-h-20 px-control-md py-control-sm text-sm",
        lg: "min-h-28 px-control-lg py-control-md text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {}

function resolveVariant(
  variant: TextareaProps["variant"],
  ariaInvalid: TextareaProps["aria-invalid"]
): NonNullable<TextareaProps["variant"]> {
  if (variant === "error") return "error";
  if (ariaInvalid === true || ariaInvalid === "true") return "error";
  return variant ?? "default";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, variant, size, "aria-invalid": ariaInvalid, disabled, ...props },
    ref
  ) => {
    const resolved = resolveVariant(variant, ariaInvalid);
    return (
      <textarea
        className={cn(textareaVariants({ variant: resolved, size, className }))}
        ref={ref}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
