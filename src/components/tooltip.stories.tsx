import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const meta: Meta<typeof TooltipContent> = {
  title: "L1/Tooltip",
  component: TooltipContent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TooltipContent>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary" size="sm">
          Hover me
        </Button>
      </TooltipTrigger>
      <TooltipContent>Short helper text</TooltipContent>
    </Tooltip>
  ),
};
