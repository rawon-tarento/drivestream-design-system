import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";
import { Input } from "./input";

const meta: Meta<typeof Label> = {
  title: "L1/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "Organization name",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "muted", "error", "warning", "info"],
    },
    size: { control: "select", options: ["sm", "md"] },
    weight: { control: "select", options: ["normal", "medium", "semibold"] },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const Muted: Story = {
  args: { variant: "muted", children: "Optional helper label" },
};

export const WithField: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-2">
      <Label htmlFor="org" required>
        Organization name
      </Label>
      <Input id="org" placeholder="Acme Mobility" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
      <Label size="md" weight="semibold">
        Semibold label
      </Label>
    </div>
  ),
};
