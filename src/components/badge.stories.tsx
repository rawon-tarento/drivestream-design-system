import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "L1/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Status",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "critical", "success", "warning", "info"],
    },
    appearance: {
      control: "select",
      options: ["filled", "outlined"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Status/meta chip. Prefer variant + appearance (filled = subtle surface, outlined = border). No legacy outline/default/destructive aliases.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {
  args: { variant: "neutral", children: "Neutral" },
};

export const Success: Story = {
  args: { variant: "success", children: "Published" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Draft" },
};

export const Critical: Story = {
  args: { variant: "critical", children: "Blocked" },
};

export const Info: Story = {
  args: { variant: "info", children: "Info" },
};

export const Outlined: Story = {
  args: { variant: "neutral", appearance: "outlined", children: "Outlined" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const variants = ["neutral", "critical", "success", "warning", "info"] as const;
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <Badge key={`f-${variant}`} variant={variant} appearance="filled">
              {variant}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <Badge key={`o-${variant}`} variant={variant} appearance="outlined">
              {variant}
            </Badge>
          ))}
        </div>
      </div>
    );
  },
};

export const MonoChip: Story = {
  args: {
    variant: "neutral",
    appearance: "outlined",
    size: "sm",
    children: "signal.path",
    className: "font-mono",
  },
};
