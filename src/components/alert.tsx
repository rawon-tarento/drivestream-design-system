import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * L1 Alert — inline banner for status / feedback (not a toast).
 *
 * Preferred API:
 *   variant:     info | success | warning | critical | neutral
 *   appearance:  filled | outlined
 *
 * Filled = subtle surface + status border. Outlined = transparent fill + border.
 */
const alertVariants = cva(
  [
    "relative flex w-full gap-3 rounded-surface border p-control-md text-sm",
  ].join(" "),
  {
    variants: {
      variant: {
        info: "",
        success: "",
        warning: "",
        critical: "",
        neutral: "",
      },
      appearance: {
        filled: "",
        outlined: "",
      },
    },
    compoundVariants: [
      {
        variant: "info",
        appearance: "filled",
        class: "border-info-border bg-info-subtle text-info-muted",
      },
      {
        variant: "info",
        appearance: "outlined",
        class: "border-info-border bg-transparent text-info-muted",
      },
      {
        variant: "success",
        appearance: "filled",
        class: "border-success-border bg-success-subtle text-success-muted",
      },
      {
        variant: "success",
        appearance: "outlined",
        class: "border-success-border bg-transparent text-success-muted",
      },
      {
        variant: "warning",
        appearance: "filled",
        class: "border-warning-border bg-warning-subtle text-warning-muted",
      },
      {
        variant: "warning",
        appearance: "outlined",
        class: "border-warning-border bg-transparent text-warning-muted",
      },
      {
        variant: "critical",
        appearance: "filled",
        class:
          "border-destructive-border bg-destructive-subtle text-destructive-muted",
      },
      {
        variant: "critical",
        appearance: "outlined",
        class: "border-destructive-border bg-transparent text-destructive-muted",
      },
      {
        variant: "neutral",
        appearance: "filled",
        class: "border-border bg-muted-subtle text-muted-foreground",
      },
      {
        variant: "neutral",
        appearance: "outlined",
        class: "border-border bg-transparent text-muted-foreground",
      },
    ],
    defaultVariants: {
      variant: "info",
      appearance: "filled",
    },
  }
);

const alertIconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  critical: AlertCircle,
  neutral: Info,
} as const;

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  /** Optional bold heading above body copy. */
  title?: React.ReactNode;
  /** Show leading status icon (default true). */
  icon?: boolean;
  /** Optional dismiss control. */
  onDismiss?: () => void;
  dismissLabel?: string;
}

function Alert({
  className,
  variant = "info",
  appearance = "filled",
  title,
  icon = true,
  onDismiss,
  dismissLabel = "Dismiss",
  children,
  ...props
}: AlertProps) {
  const resolved = variant ?? "info";
  const Icon = alertIconMap[resolved];
  return (
    <div
      role={resolved === "critical" ? "alert" : "status"}
      className={cn(
        alertVariants({ variant: resolved, appearance, className })
      )}
      {...props}
    >
      {icon ? (
        <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      ) : null}
      <div className="min-w-0 flex-1 space-y-1">
        {title ? (
          <div className="font-semibold text-foreground">{title}</div>
        ) : null}
        {children ? <div className="text-sm leading-snug">{children}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className={cn(
            "shrink-0 rounded-control p-control-xs text-icon-muted",
            "hover:bg-surface-hover hover:text-icon",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/64"
          )}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

export { Alert, alertVariants };
