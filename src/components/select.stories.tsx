import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";
import { Label } from "./label";

const meta: Meta<typeof Select> = {
  title: "L1/Select",
  component: Select,
  tags: ["autodocs"],
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
          "Native select with Input-matched focus (ring-1/64, no offset). Prefer value + onValueChange. aria-invalid maps to error.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

function DemoOptions() {
  return (
    <>
      <option value="">Select…</option>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </>
  );
}

export const Default: Story = {
  render: (args) => (
    <Select {...args} defaultValue="a">
      <DemoOptions />
    </Select>
  ),
};

export const Error: Story = {
  render: (args) => (
    <Select {...args} variant="error" aria-invalid defaultValue="">
      <DemoOptions />
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled defaultValue="a">
      <DemoOptions />
    </Select>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <Select size="sm" defaultValue="a">
        <DemoOptions />
      </Select>
      <Select size="md" defaultValue="a">
        <DemoOptions />
      </Select>
      <Select size="lg" defaultValue="a">
        <DemoOptions />
      </Select>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-2">
      <Label htmlFor="region">Region</Label>
      <Select id="region" defaultValue="a">
        <DemoOptions />
      </Select>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Tab for soft focus ring. Hover for border. Error via variant or aria-invalid.
      </p>
      <Select defaultValue="a">
        <DemoOptions />
      </Select>
      <Select variant="error" defaultValue="">
        <DemoOptions />
      </Select>
      <Select disabled defaultValue="a">
        <DemoOptions />
      </Select>
    </div>
  ),
};
