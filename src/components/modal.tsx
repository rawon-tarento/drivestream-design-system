"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Separator } from "./separator";
import { cn } from "../lib/utils";

/**
 * L1 Modal — structured overlay (header / body / footer) with consistent spacing.
 * Prefer this over ad-hoc Dialog composition for confirmations, forms, and detail panels.
 *
 * Layout: Header → inset separator → Body → inset separator → Footer (CTAs).
 * Separators align to content width (`px-6`), not the full dialog edge.
 * Body keeps non-scrolling `py-4` gutters so content never sticks to separators.
 */

const Modal = DialogPrimitive.Root;
const ModalTrigger = DialogPrimitive.Trigger;
const ModalPortal = DialogPrimitive.Portal;
const ModalClose = DialogPrimitive.Close;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-modal-overlay/50", className)}
    {...props}
  />
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const modalContentVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-50 flex max-h-[min(90vh,48rem)] w-full -translate-x-1/2 -translate-y-1/2",
    "flex-col overflow-hidden rounded-modal border border-border bg-surface p-0 text-foreground shadow-md",
    "focus:outline-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "max-w-[min(100%-2rem,24rem)]",
        md: "max-w-[min(100%-2rem,32rem)]",
        lg: "max-w-[min(100%-2rem,36rem)]",
        xl: "max-w-[min(100%-2rem,42rem)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  /** Show the top-right dismiss control (default true). */
  showClose?: boolean;
  /** Accessible label for the dismiss control. */
  closeLabel?: string;
}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(
  (
    {
      className,
      children,
      size = "md",
      showClose = true,
      closeLabel = "Close",
      ...props
    },
    ref
  ) => (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(modalContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {showClose ? (
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 z-10 rounded-control p-control-xs text-icon-muted",
              "hover:bg-surface-hover hover:text-icon",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/64",
              "disabled:pointer-events-none"
            )}
            aria-label={closeLabel}
          >
            <X className="h-4 w-4" aria-hidden />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </ModalPortal>
  )
);
ModalContent.displayName = "ModalContent";

function ModalHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex shrink-0 flex-col">
      <div
        className={cn(
          "flex flex-col gap-1.5 px-6 pb-4 pr-12 pt-6 text-left",
          className
        )}
        {...props}
      >
        {children}
      </div>
      <div className="px-6" aria-hidden>
        <Separator decorative />
      </div>
    </div>
  );
}

function ModalBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-6 py-4">
      <div
        className={cn(
          "min-h-0 flex-1 overflow-y-auto text-sm text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

function ModalFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex shrink-0 flex-col" {...props}>
      <div className="px-6" aria-hidden>
        <Separator decorative />
      </div>
      <div
        className={cn(
          "flex flex-col-reverse gap-2 px-6 pb-6 pt-4 sm:flex-row sm:justify-end",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-snug tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm leading-normal text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  modalContentVariants,
};
