import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./textarea";
import { Label } from "./label";

const meta: Meta<typeof Textarea> = {
  title: "L1/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "Add notes…",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    variant: "error",
    defaultValue: "Missing required detail",
    "aria-invalid": true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-3">
      <Textarea size="sm" placeholder="Small" />
      <Textarea size="md" placeholder="Medium" />
      <Textarea size="lg" placeholder="Large" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-2">
      <Label htmlFor="notes">Release notes</Label>
      <Textarea id="notes" placeholder="What changed?" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-3">
      <Textarea placeholder="Default" />
      <Textarea placeholder="Invalid" aria-invalid />
      <Textarea placeholder="Disabled" disabled />
    </div>
  ),
};
