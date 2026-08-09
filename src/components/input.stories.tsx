import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Input> = {
  title: "L1/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter value",
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
  parameters: {
    docs: {
      description: {
        component:
          "Field control with default/error variants and sm/md/lg sizes. aria-invalid also maps to error styles. Optional start/end adornments.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    variant: "error",
    defaultValue: "bad value",
    "aria-invalid": true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Read only via disabled",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-2">
      <Label htmlFor="org-name">Organization name</Label>
      <Input id="org-name" placeholder="Acme Mobility" />
    </div>
  ),
};

export const WithAdornment: Story = {
  render: () => (
    <div className="max-w-md">
      <Input
        placeholder="Search devices"
        startAdornment={<Search aria-hidden />}
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Tab for focus-visible. Focus uses a soft 1px tinted ring (no offset). Hover for border.
      </p>
      <Input placeholder="Default" />
      <Input placeholder="Error via aria-invalid" aria-invalid />
      <Input placeholder="Disabled" disabled />
    </div>
  ),
};
