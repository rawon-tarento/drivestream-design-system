import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./spinner";
import { Button } from "./button";

const meta: Meta<typeof Spinner> = {
  title: "L1/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: "md" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner size="sm" className="text-accent-foreground" />
      Saving…
    </Button>
  ),
};
