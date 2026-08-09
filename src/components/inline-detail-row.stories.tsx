import type { Meta, StoryObj } from "@storybook/react-vite";
import { InlineDetailRow } from "./inline-detail-row";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const meta: Meta<typeof InlineDetailRow> = {
  title: "L1/InlineDetailRow",
  component: InlineDetailRow,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    layout: { control: "select", options: ["inline", "stacked"] },
    valueWeight: { control: "select", options: ["medium", "normal", "mono"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Compact label:value for preview cards and summaries. Prefer ReadOnlyDetailTable when you need aligned columns across many fields.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InlineDetailRow>;

export const Default: Story = {
  args: {
    label: "Organization",
    children: "Acme Mobility",
  },
};

export const MonoValue: Story = {
  args: {
    label: "Tenant ID",
    children: "ten_01HXYZ",
    valueWeight: "mono",
  },
};

export const Stacked: Story = {
  args: {
    label: "Description",
    children: "Longer copy that wraps more cleanly in stacked layout.",
    layout: "stacked",
  },
};

export const InCard: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <InlineDetailRow label="Name">Acme Mobility</InlineDetailRow>
        <InlineDetailRow label="Region">ap-south-1</InlineDetailRow>
        <InlineDetailRow label="Tenant ID" valueWeight="mono">
          ten_01HXYZ
        </InlineDetailRow>
        <InlineDetailRow size="sm" label="Plan">
          Enterprise
        </InlineDetailRow>
      </CardContent>
    </Card>
  ),
};
