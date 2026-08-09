import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, type ButtonProps } from "./button";

const meta: Meta<typeof Button> = {
  title: "L1/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Continue",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "ghost",
        "critical",
        "critical-soft",
        "success",
        "success-soft",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Primary CTA (`variant=\"primary\"`) uses accent semantic tokens. States: default / hover / focus-visible / active / disabled. No loading API yet.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Critical: Story = {
  args: { variant: "critical", children: "Delete" },
};

export const CriticalSoft: Story = {
  args: { variant: "critical-soft", children: "Remove" },
};

export const Success: Story = {
  args: { variant: "success", children: "Publish" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="More">
        ...
      </Button>
    </div>
  ),
};

export const WithIconGap: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>
        <span aria-hidden>{"->"}</span>
        Next
      </Button>
      <Button variant="secondary">
        Back
        <span aria-hidden>{"<-"}</span>
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Tab to verify focus-visible rings. Hover and press for hover/active.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary" disabled>
          Secondary disabled
        </Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="critical">Critical</Button>
      </div>
    </div>
  ),
};

const VARIANTS: NonNullable<ButtonProps["variant"]>[] = [
  "primary",
  "secondary",
  "ghost",
  "critical",
  "critical-soft",
  "success",
  "success-soft",
];

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <span className="w-28 font-mono text-xs text-muted-foreground">{variant}</span>
          <Button variant={variant}>{variant}</Button>
        </div>
      ))}
    </div>
  ),
};
