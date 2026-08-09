import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableEmpty,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "./data-table";

type Density = NonNullable<
  VariantProps<typeof readOnlyDetailTableVariants>["density"]
>;

const DensityContext = React.createContext<Density>("default");

const readOnlyDetailTableVariants = cva("w-full overflow-x-auto", {
  variants: {
    density: {
      compact: "",
      default: "",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

const readOnlyDetailRowCellVariants = cva("align-top text-left text-sm", {
  variants: {
    density: {
      compact: "py-control-xs",
      default: "py-control-sm",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

export interface ReadOnlyDetailTableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof readOnlyDetailTableVariants> {
  children: React.ReactNode;
}

/**
 * Read-only key/value layout as a semantic table (aligned label/value columns).
 * Prefer for detail panels; use InlineDetailRow for single-line preview chips.
 */
export function ReadOnlyDetailTable({
  children,
  className,
  density = "default",
  ...props
}: ReadOnlyDetailTableProps) {
  const resolved = density ?? "default";
  return (
    <DensityContext.Provider value={resolved}>
      <div
        className={cn(
          readOnlyDetailTableVariants({ density: resolved, className })
        )}
        data-density={resolved}
        {...props}
      >
        <table className="w-full border-collapse text-sm">
          <tbody className="[&>tr]:border-b [&>tr]:border-divider [&>tr:last-child]:border-0">
            {children}
          </tbody>
        </table>
      </div>
    </DensityContext.Provider>
  );
}

export interface ReadOnlyDetailRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof readOnlyDetailRowCellVariants> {
  label: React.ReactNode;
  children: React.ReactNode;
  /** Mono value (ids, hashes, paths). */
  mono?: boolean;
}

export function ReadOnlyDetailRow({
  label,
  children,
  className,
  density: densityProp,
  mono = false,
  ...props
}: ReadOnlyDetailRowProps) {
  const ctx = React.useContext(DensityContext);
  const density = densityProp ?? ctx;
  const cellPad = readOnlyDetailRowCellVariants({ density });
  return (
    <tr className={className} {...props}>
      <th
        scope="row"
        className={cn(
          cellPad,
          "w-[min(12rem,38%)] max-w-[16rem] shrink-0 pr-control-lg",
          "font-medium text-muted-foreground"
        )}
      >
        {label}
      </th>
      <td
        className={cn(
          cellPad,
          "font-medium text-foreground",
          mono && "font-mono text-xs tracking-tight font-normal"
        )}
      >
        {children}
      </td>
    </tr>
  );
}

export interface ReadOnlyColumnTableHeader {
  key: string;
  label: React.ReactNode;
  /** Optional cell class for body cells in this column (e.g. `text-right font-mono`). */
  cellClassName?: string;
}

export interface ReadOnlyColumnTableProps {
  headers: ReadOnlyColumnTableHeader[];
  rows: Record<string, React.ReactNode>[];
  "aria-label"?: string;
  className?: string;
  density?: Density;
  /** Shown when `rows` is empty. */
  empty?: React.ReactNode;
  /** Stable row key resolver (defaults to index). */
  getRowKey?: (row: Record<string, React.ReactNode>, index: number) => string;
}

/**
 * Dense read-only data table (column headers + rows) for lists/catalogs.
 * Built on L1 {@link DataTable} (PAT-DATA-TABLE).
 */
export function ReadOnlyColumnTable({
  headers,
  rows,
  "aria-label": ariaLabel,
  className,
  density = "default",
  empty,
  getRowKey,
}: ReadOnlyColumnTableProps) {
  return (
    <DataTable aria-label={ariaLabel} className={className} density={density}>
      <DataTableHeader>
        <DataTableRow className="hover:bg-transparent">
          {headers.map((h) => (
            <DataTableHead key={h.key}>{h.label}</DataTableHead>
          ))}
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        {rows.length === 0 && empty ? (
          <DataTableEmpty colSpan={headers.length}>{empty}</DataTableEmpty>
        ) : (
          rows.map((row, rowIndex) => (
            <DataTableRow
              key={getRowKey?.(row, rowIndex) ?? String(rowIndex)}
            >
              {headers.map((h) => (
                <DataTableCell key={h.key} className={h.cellClassName}>
                  {row[h.key]}
                </DataTableCell>
              ))}
            </DataTableRow>
          ))
        )}
      </DataTableBody>
    </DataTable>
  );
}

export {
  readOnlyDetailTableVariants,
  readOnlyDetailRowCellVariants,
};
