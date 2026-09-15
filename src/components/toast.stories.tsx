import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastProps,
} from "./toast";

const meta: Meta<typeof Toast> = {
  title: "L1/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "critical", "neutral"],
    },
    icon: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Transient portaled feedback (Radix Toast). Same status variants as Alert. Compose ToastProvider + ToastViewport + Toast (Title / Description / Action / Close). Prefer Button inside ToastAction. Not for inline banners — use Alert.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

function ToastDemo({
  variant = "info",
  title,
  description,
  withAction = false,
  duration = 5000,
}: {
  variant?: ToastProps["variant"];
  title: string;
  description?: string;
  withAction?: boolean;
  duration?: number;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProvider duration={duration} swipeDirection="right">
      <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Show toast
      </Button>
      <Toast variant={variant} open={open} onOpenChange={setOpen}>
        <ToastTitle>{title}</ToastTitle>
        {description ? (
          <ToastDescription>{description}</ToastDescription>
        ) : null}
        {withAction ? (
          <ToastAction asChild altText="Undo">
            <Button type="button" variant="secondary" size="sm">
              Undo
            </Button>
          </ToastAction>
        ) : null}
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export const Success: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      title="Campaign published"
      description="Devices will sync on the next heartbeat."
    />
  ),
};

export const Variants: Story = {
  render: function VariantsStory() {
    const [open, setOpen] = React.useState<Record<string, boolean>>({});
    const variants = [
      "info",
      "success",
      "warning",
      "critical",
      "neutral",
    ] as const;

    return (
      <ToastProvider duration={6000} swipeDirection="right">
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <Button
              key={variant}
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setOpen((prev) => ({ ...prev, [variant]: true }))}
            >
              {variant}
            </Button>
          ))}
        </div>
        {variants.map((variant) => (
          <Toast
            key={variant}
            variant={variant}
            open={Boolean(open[variant])}
            onOpenChange={(next) =>
              setOpen((prev) => ({ ...prev, [variant]: next }))
            }
          >
            <ToastTitle className="capitalize">{variant}</ToastTitle>
            <ToastDescription>
              Sample {variant} toast body copy.
            </ToastDescription>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const WithAction: Story = {
  render: () => (
    <ToastDemo
      variant="warning"
      title="Draft discarded"
      description="You can restore the last autosave."
      withAction
      duration={8000}
    />
  ),
};

export const CriticalSticky: Story = {
  render: () => (
    <ToastDemo
      variant="critical"
      title="Signature verification failed"
      description="Dismiss manually — this toast does not auto-close."
      duration={Infinity}
    />
  ),
};

export const StaticPreview: Story = {
  render: () => (
    <ToastProvider duration={Infinity}>
      <div className="relative min-h-[12rem] w-full max-w-md">
        <Toast open variant="success" className="relative">
          <ToastTitle>Saved</ToastTitle>
          <ToastDescription>Organization settings updated.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport className="absolute inset-x-0 bottom-0 right-auto top-auto max-w-none" />
      </div>
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Always-open preview for visual review (no portal timing).",
      },
    },
  },
};
