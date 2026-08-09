import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "L1/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Block: Story = {
  args: { className: "h-24 w-64" },
};

export const TextLines: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Skeleton shape="text" className="w-3/4" />
      <Skeleton shape="text" />
      <Skeleton shape="text" className="w-1/2" />
    </div>
  ),
};

export const Circle: Story = {
  args: { shape: "circle", className: "h-10 w-10" },
};
