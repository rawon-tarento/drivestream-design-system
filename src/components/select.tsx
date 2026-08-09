"use client";

/**
 * Canonical native `<select>` for DriveStream Ops.
 *
 * Prefer `value` + `onValueChange` over raw `onChange` unless you need the event.
 * Matches Input focus language: soft ring-1/64, no ring-offset.
 */

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const selectVariants = cva(
  [
    "flex w-full cursor-pointer appearance-none items-center",
    "rounded-input border bg-input-background text-input-foreground",
    "transition-[border-color,box-shadow] duration-200 ease-out",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:bg-input-background-disabled disabled:opacity-50",
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
        sm: "h-9 pl-control-md pr-9 text-xs",
        md: "h-11 pl-control-md pr-10 py-control-sm text-sm",
        lg: "h-12 pl-control-lg pr-10 py-control-md text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
}

function resolveVariant(
  variant: SelectProps["variant"],
  ariaInvalid: SelectProps["aria-invalid"]
): NonNullable<SelectProps["variant"]> {
  if (variant === "error") return "error";
  if (ariaInvalid === true || ariaInvalid === "true") return "error";
  return variant ?? "default";
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      value,
      onValueChange,
      onChange,
      children,
      variant,
      size,
      disabled,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const resolved = resolveVariant(variant, ariaInvalid);
    return (
      <div className="relative w-full">
        <select
          className={cn(selectVariants({ variant: resolved, size, className }))}
          value={value}
          disabled={disabled}
          aria-invalid={ariaInvalid}
          onChange={(e) => {
            onChange?.(e);
            onValueChange?.(e.target.value);
          }}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-icon-muted"
          aria-hidden
        />
      </div>
    );
  }
);
Select.displayName = "Select";

const SelectTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof selectVariants> & {
      children: React.ReactNode;
    }
>(({ className, children, variant, size, ...props }, ref) => (
  <div
    className={cn(
      selectVariants({ variant, size }),
      "justify-between pr-3",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 text-icon-muted" aria-hidden />
  </div>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    className={cn(
      "relative z-50 min-w-32 overflow-hidden rounded-surface border border-border",
      "bg-popover text-popover-foreground shadow-md",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </div>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, children, ...props }, ref) => (
  <option ref={ref} className={className} {...props}>
    {children}
  </option>
));
SelectItem.displayName = "SelectItem";

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    placeholder?: string;
  }
>(({ className, children, placeholder, ...props }, ref) => (
  <span className={cn("block truncate", className)} ref={ref} {...props}>
    {children || placeholder}
  </span>
));
SelectValue.displayName = "SelectValue";

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  selectVariants,
};
