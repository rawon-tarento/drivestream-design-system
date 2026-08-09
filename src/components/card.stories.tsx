import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";

const meta: Meta<typeof Card> = {
  title: "L1/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    variant: "default",
    elevation: "sm",
    interactive: false,
    padded: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "accent", "success", "warning", "critical"],
      description:
        "Border-only. Status variants use solid token colors at 1px (utilities must win over base border-color).",
    },
    elevation: { control: "select", options: ["none", "sm", "md"] },
    interactive: { control: "boolean" },
    padded: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Layout surface for grouped content. Variants are border-only at 1px with solid status colors (after fixing unlayered * border-color override).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
        <CardDescription>
          Variant: <span className="font-mono">{args.variant ?? "default"}</span> — 1px border
          only (solid status colors).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          No background tint. Accent/success/warning/critical should read clearly against the
          default slate border.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Continue</Button>
        <Button size="sm" variant="secondary">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  args: { interactive: true },
  render: (args) => (
    <Card {...args} className="max-w-md">
      <CardHeader>
        <CardTitle>Selectable card</CardTitle>
        <CardDescription>Hover and focus-visible for interactive surfaces.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Tab to this card to see soft focus.</p>
      </CardContent>
    </Card>
  ),
};

export const Elevations: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 md:grid-cols-3">
      <Card elevation="none">
        <CardHeader>
          <CardTitle>None</CardTitle>
          <CardDescription>Border only</CardDescription>
        </CardHeader>
      </Card>
      <Card elevation="sm">
        <CardHeader>
          <CardTitle>Small</CardTitle>
          <CardDescription>Default</CardDescription>
        </CardHeader>
      </Card>
      <Card elevation="md">
        <CardHeader>
          <CardTitle>Medium</CardTitle>
          <CardDescription>Raised</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const variants = ["default", "accent", "success", "warning", "critical"] as const;
    return (
      <div className="grid max-w-3xl gap-4 md:grid-cols-2">
        {variants.map((variant) => (
          <Card key={variant} variant={variant}>
            <CardHeader>
              <CardTitle className="capitalize">{variant}</CardTitle>
              <CardDescription>
                {variant === "default"
                  ? "1px border-border"
                  : `1px border-${variant === "critical" ? "destructive" : variant}`}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  },
};
