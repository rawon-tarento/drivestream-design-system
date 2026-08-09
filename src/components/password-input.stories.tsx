import type { Meta, StoryObj } from "@storybook/react-vite";
import { PasswordInput } from "./password-input";
import { Label } from "./label";

const meta: Meta<typeof PasswordInput> = {
  title: "L1/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  args: {
    placeholder: "••••••••",
    ariaLabelShow: "Show password",
    ariaLabelHide: "Hide password",
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
          "Composes Input with a show/hide toggle. Use variant=\"error\" or aria-invalid for invalid state.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    variant: "error",
    "aria-invalid": true,
    defaultValue: "short",
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex max-w-md flex-col gap-2">
      <Label htmlFor="pwd">Password</Label>
      <PasswordInput id="pwd" {...args} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <PasswordInput
        placeholder="Default"
        ariaLabelShow="Show password"
        ariaLabelHide="Hide password"
      />
      <PasswordInput
        placeholder="Error"
        variant="error"
        ariaLabelShow="Show password"
        ariaLabelHide="Hide password"
      />
      <PasswordInput
        placeholder="Disabled"
        disabled
        ariaLabelShow="Show password"
        ariaLabelHide="Hide password"
      />
    </div>
  ),
};
