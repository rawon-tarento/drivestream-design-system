"use client";

/**
 * L1 Toast — transient, portaled status feedback (not an inline Alert).
 *
 * Preferred composition:
 *   ToastProvider → ToastViewport + Toast(s)
 *   Toast: variant info | success | warning | critical | neutral
 *   Slots: ToastTitle · ToastDescription · ToastAction · ToastClose
 *
 * Status tokens match Alert. Prefer Button (secondary/ghost sm) inside ToastAction.
 */

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "../lib/utils";

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      [
        "fixed bottom-4 right-4 z-[100] flex max-h-screen w-full",
        "max-w-[min(100%-2rem,24rem)] flex-col-reverse gap-2 outline-none",
        "sm:flex-col",
      ].join(" "),
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-start gap-3",
    "overflow-hidden rounded-surface border p-control-md text-sm shadow-md",
    "transition-[transform,opacity] duration-200 ease-out",
    "data-[swipe=cancel]:translate-x-0",
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
    "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
    "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
  ].join(" "),
  {
    variants: {
      variant: {
        info: "border-info-border bg-info-subtle text-info-muted",
        success: "border-success-border bg-success-subtle text-success-muted",
        warning: "border-warning-border bg-warning-subtle text-warning-muted",
        critical:
          "border-destructive-border bg-destructive-subtle text-destructive-muted",
        neutral: "border-border bg-surface text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const toastIconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  critical: AlertCircle,
  neutral: Info,
} as const;

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {
  /** Show leading status icon (default true). */
  icon?: boolean;
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(
  (
    { className, variant = "info", icon = true, children, ...props },
    ref
  ) => {
    const resolved = variant ?? "info";
    const Icon = toastIconMap[resolved];
    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(toastVariants({ variant: resolved, className }))}
        {...props}
      >
        {icon ? (
          <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-1 pr-6">{children}</div>
      </ToastPrimitive.Root>
    );
  }
);
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn("text-sm font-semibold text-foreground", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn("text-sm leading-snug", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn("mt-2 shrink-0 self-start", className)}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> & {
    label?: string;
  }
>(({ className, label = "Dismiss", ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    aria-label={label}
    className={cn(
      [
        "absolute right-2 top-2 rounded-control p-control-xs text-icon-muted",
        "hover:bg-surface-hover hover:text-icon",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/64",
      ].join(" "),
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" aria-hidden />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  toastVariants,
};
