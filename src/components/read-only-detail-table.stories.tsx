import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ReadOnlyColumnTable,
  ReadOnlyDetailRow,
  ReadOnlyDetailTable,
} from "./read-only-detail-table";
import { Badge } from "./badge";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const meta: Meta<typeof ReadOnlyDetailTable> = {
  title: "L1/ReadOnlyDetailTable",
  component: ReadOnlyDetailTable,
  tags: ["autodocs"],
  argTypes: {
    density: { control: "select", options: ["default", "compact"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Aligned key/value detail table for panels. Use density=compact for dense ops chrome. ReadOnlyColumnTable is for multi-column lists.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReadOnlyDetailTable>;

export const Default: Story = {
  args: { density: "default" },
  render: (args) => (
    <Card className="max-w-lg" padded={false}>
      <CardHeader className="p-section pb-0">
        <CardTitle>Campaign</CardTitle>
      </CardHeader>
      <CardContent className="p-section pt-stack-sm">
        <ReadOnlyDetailTable {...args}>
          <ReadOnlyDetailRow label="Status">
            <Badge variant="success" size="sm">
              Active
            </Badge>
          </ReadOnlyDetailRow>
          <ReadOnlyDetailRow label="Campaign ID" mono>
            camp_01HQW
          </ReadOnlyDetailRow>
          <ReadOnlyDetailRow label="Created">22 Jul 2026, 14:02</ReadOnlyDetailRow>
          <ReadOnlyDetailRow label="Description">
            Staged rollout for ECU firmware train B.
          </ReadOnlyDetailRow>
        </ReadOnlyDetailTable>
      </CardContent>
    </Card>
  ),
};

export const Compact: Story = {
  args: { density: "compact" },
  render: (args) => (
    <div className="max-w-lg">
      <ReadOnlyDetailTable {...args}>
        <ReadOnlyDetailRow label="Job ID" mono>
          job_88af
        </ReadOnlyDetailRow>
        <ReadOnlyDetailRow label="Status">Queued</ReadOnlyDetailRow>
        <ReadOnlyDetailRow label="Targets">1,240</ReadOnlyDetailRow>
      </ReadOnlyDetailTable>
    </div>
  ),
};

export const ColumnTable: Story = {
  render: () => (
    <div className="max-w-2xl">
      <ReadOnlyColumnTable
        aria-label="Devices"
        headers={[
          { key: "id", label: "Device ID", cellClassName: "font-mono text-xs" },
          { key: "name", label: "Name" },
          { key: "status", label: "Status" },
        ]}
        rows={[
          { id: "dev_01", name: "Fleet van A", status: "Online" },
          { id: "dev_02", name: "Fleet van B", status: "Offline" },
          { id: "dev_03", name: "Depot hub", status: "Online" },
        ]}
      />
    </div>
  ),
};
