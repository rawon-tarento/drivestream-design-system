"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../lib/utils";
import { Input, type InputProps } from "./input";

export interface PasswordInputProps
  extends Omit<InputProps, "type" | "startAdornment" | "endAdornment"> {
  ariaLabelShow: string;
  ariaLabelHide: string;
}

/**
 * Password field with show/hide toggle via Input endAdornment.
 * Shares Input `variant` (`default` | `error`) and `size` (`sm` | `md` | `lg`).
 * Prefer `variant="error"` (or `aria-invalid`) for invalid state.
 */
export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      className,
      ariaLabelShow,
      ariaLabelHide,
      disabled,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        disabled={disabled}
        variant={variant}
        size={size}
        className={className}
        endAdornment={
          <button
            type="button"
            className={cn(
              "rounded-surface p-control-sm",
              "text-icon-muted transition-colors duration-200 ease-out",
              "hover:bg-surface-hover hover:text-icon",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/64",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? ariaLabelHide : ariaLabelShow}
            aria-pressed={visible}
            disabled={disabled}
          >
            {visible ? (
              <EyeOff className="h-4 w-4 shrink-0" aria-hidden />
            ) : (
              <Eye className="h-4 w-4 shrink-0" aria-hidden />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";
