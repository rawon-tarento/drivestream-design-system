"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 DataTable — PAT-DATA-TABLE surface for list/catalog rows.
 * Prefer {@link ReadOnlyColumnTable} for simple header+rows; use these
 * primitives when cells need custom structure (links, actions, badges).
 */

const dataTableShellVariants = cva(
  /* Semantic surface radius; no elevation — tables sit flush in cards */
  "overflow-x-auto rounded-surface border border-border bg-surface",
  {
    variants: {
      density: {
        compact: "",
        default: "",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

const dataTableCellVariants = cva("align-middle text-sm", {
  variants: {
    density: {
      compact: "px-control-md py-control-xs",
      default: "px-control-md py-3",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

type Density = NonNullable<VariantProps<typeof dataTableShellVariants>["density"]>;

const DataTableDensityContext = React.createContext<Density>("default");

export interface DataTableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataTableShellVariants> {
  /** Accessible name for the table (required when no visible caption). */
  "aria-label"?: string;
}

export function DataTable({
  className,
  density = "default",
  children,
  "aria-label": ariaLabel,
  ...props
}: DataTableProps) {
  const resolved = density ?? "default";
  return (
    <DataTableDensityContext.Provider value={resolved}>
      <div
        className={cn(dataTableShellVariants({ density: resolved }), className)}
        data-density={resolved}
        {...props}
      >
        <table
          className="w-full min-w-[28rem] border-collapse text-sm"
          aria-label={ariaLabel}
        >
          {children}
        </table>
      </div>
    </DataTableDensityContext.Provider>
  );
}

export function DataTableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "sticky top-0 z-[1] border-b border-divider bg-surface-alt text-left",
        className
      )}
      {...props}
    />
  );
}

export function DataTableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn(className)} {...props} />;
}

export function DataTableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-divider last:border-0 transition-colors",
        "hover:bg-surface-hover",
        className
      )}
      {...props}
    />
  );
}

export function DataTableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  const density = React.useContext(DataTableDensityContext);
  return (
    <th
      scope="col"
      className={cn(
        dataTableCellVariants({ density }),
        "whitespace-nowrap font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function DataTableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const density = React.useContext(DataTableDensityContext);
  return (
    <td
      className={cn(
        dataTableCellVariants({ density }),
        "text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function DataTableEmpty({
  className,
  children,
  colSpan,
}: {
  className?: string;
  children: React.ReactNode;
  colSpan: number;
}) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className={cn(
          "px-control-md py-10 text-center text-sm text-muted-foreground",
          className
        )}
      >
        {children}
      </td>
    </tr>
  );
}

export {
  dataTableShellVariants,
  dataTableCellVariants,
};
