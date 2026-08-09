import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta: Meta<typeof Checkbox> = {
  title: "L1/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "error"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { checked: false, indeterminate: true },
};

export const Error: Story = {
  args: { checked: false, variant: "error", "aria-invalid": true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox size="sm" checked />
      <Checkbox size="md" checked />
      <Checkbox size="lg" checked />
    </div>
  ),
};

export const WithLabel: Story = {
  render: function WithLabelStory() {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="terms">Generate API keys</Label>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox checked={false} />
        <span className="text-sm">Unchecked</span>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked />
        <span className="text-sm">Checked</span>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox indeterminate />
        <span className="text-sm">Indeterminate</span>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox disabled checked />
        <span className="text-sm text-muted-foreground">Disabled</span>
      </div>
    </div>
  ),
};
