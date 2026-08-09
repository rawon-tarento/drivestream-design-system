import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableEmpty,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "./data-table";

const meta: Meta<typeof DataTable> = {
  title: "L1/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "PAT-DATA-TABLE list surface. Prefer for admin catalogs and directory tables. Use ReadOnlyColumnTable for simple header+row data.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => (
    <DataTable aria-label="Platform team" className="max-w-3xl">
      <DataTableHeader>
        <DataTableRow className="hover:bg-transparent">
          <DataTableHead>Email</DataTableHead>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Role</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Created</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow>
          <DataTableCell>ops@example.com</DataTableCell>
          <DataTableCell>Priya N.</DataTableCell>
          <DataTableCell className="font-mono text-xs">platform_admin</DataTableCell>
          <DataTableCell>
            <Badge variant="success" size="sm" appearance="filled">
              Active
            </Badge>
          </DataTableCell>
          <DataTableCell className="text-muted-foreground">28 Jul 2026</DataTableCell>
        </DataTableRow>
        <DataTableRow>
          <DataTableCell>deepa@example.com</DataTableCell>
          <DataTableCell>Deepa K.</DataTableCell>
          <DataTableCell className="font-mono text-xs">platform_admin</DataTableCell>
          <DataTableCell>
            <Badge variant="success" size="sm" appearance="filled">
              Active
            </Badge>
          </DataTableCell>
          <DataTableCell className="text-muted-foreground">12 Jul 2026</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTable>
  ),
};

export const WithActions: Story = {
  render: () => (
    <DataTable aria-label="Canonicals" className="max-w-3xl">
      <DataTableHeader>
        <DataTableRow className="hover:bg-transparent">
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Actions</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow>
          <DataTableCell className="font-mono text-xs">vehicle_speed</DataTableCell>
          <DataTableCell>
            <Badge variant="warning" size="sm" appearance="filled">
              Draft
            </Badge>
          </DataTableCell>
          <DataTableCell>
            <Button size="sm" variant="secondary">
              Open
            </Button>
          </DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTable>
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTable aria-label="Empty directory" className="max-w-xl">
      <DataTableHeader>
        <DataTableRow className="hover:bg-transparent">
          <DataTableHead>Email</DataTableHead>
          <DataTableHead>Role</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableEmpty colSpan={2}>No team members yet.</DataTableEmpty>
      </DataTableBody>
    </DataTable>
  ),
};
