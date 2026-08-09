"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 Checkbox — size × checked × indeterminate × invalid.
 *
 * Prefer `checked` + `onCheckedChange`. Use `indeterminate` for mixed state.
 * `aria-invalid` / `variant="error"` for invalid.
 * Checked fill uses accent (aligned with interactive CTA language).
 */
const checkboxBoxVariants = cva(
  [
    "pointer-events-none flex shrink-0 items-center justify-center",
    "rounded-chip border transition-colors duration-200 ease-out",
    "peer-disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-input-border bg-input-background",
          "peer-hover:border-input-border-hover",
          "peer-focus-visible:border-accent-border",
          "peer-focus-visible:ring-1 peer-focus-visible:ring-ring/64",
        ].join(" "),
        error: [
          "border-input-border-error bg-input-background",
          "peer-focus-visible:border-input-border-error",
          "peer-focus-visible:ring-1 peer-focus-visible:ring-ring-error/64",
        ].join(" "),
      },
      size: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
      },
      state: {
        unchecked: "",
        checked: "",
        indeterminate: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        state: "checked",
        class: "border-accent bg-accent text-accent-foreground",
      },
      {
        variant: "default",
        state: "indeterminate",
        class: "border-accent bg-accent text-accent-foreground",
      },
      {
        variant: "error",
        state: "checked",
        class: "border-input-border-error bg-destructive text-destructive-foreground",
      },
      {
        variant: "error",
        state: "indeterminate",
        class: "border-input-border-error bg-destructive text-destructive-foreground",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "unchecked",
    },
  }
);

const checkboxIconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-2.5",
      md: "size-3",
      lg: "size-3.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const checkboxHitAreaVariants = cva("relative inline-flex shrink-0", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface CheckboxProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "checked" | "onCheckedChange" | "size"
    >,
    Omit<VariantProps<typeof checkboxBoxVariants>, "state"> {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function resolveVariant(
  variant: CheckboxProps["variant"],
  ariaInvalid: CheckboxProps["aria-invalid"]
): NonNullable<CheckboxProps["variant"]> {
  if (variant === "error") return "error";
  if (ariaInvalid === true || ariaInvalid === "true") return "error";
  return variant ?? "default";
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked = false,
      indeterminate = false,
      onCheckedChange,
      disabled,
      variant,
      size,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const resolved = resolveVariant(variant, ariaInvalid);
    const state = indeterminate
      ? "indeterminate"
      : checked
        ? "checked"
        : "unchecked";

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    return (
      <div className={cn(checkboxHitAreaVariants({ size }))}>
        <input
          type="checkbox"
          disabled={disabled}
          className={cn(
            "peer absolute inset-0 z-10 m-0 size-full cursor-pointer opacity-0",
            "focus-visible:outline-none",
            "disabled:cursor-not-allowed"
          )}
          checked={checked}
          aria-invalid={ariaInvalid}
          aria-checked={indeterminate ? "mixed" : checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          ref={setRefs}
          {...props}
        />
        <div
          className={cn(
            checkboxBoxVariants({
              variant: resolved,
              size,
              state,
            }),
            className
          )}
          aria-hidden
        >
          {indeterminate ? (
            <Minus className={checkboxIconVariants({ size })} strokeWidth={3} aria-hidden />
          ) : checked ? (
            <Check className={checkboxIconVariants({ size })} strokeWidth={3} aria-hidden />
          ) : null}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxBoxVariants as checkboxVariants };
