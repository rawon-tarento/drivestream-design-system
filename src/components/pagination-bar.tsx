"use client";

/**
 * L1 PaginationBar — table/list footer: page size select + previous/next + range.
 *
 * Preferred API:
 *   pageSize + onPageSizeChange · from / to / total · onPrevious / onNext
 *   pageSizeOptions default: 20 | 30 | 40 | 50
 *   canPrevious / canNext optional (derived from range when omitted)
 */

import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Label } from "./label";
import { Select } from "./select";

export const PAGE_SIZE_OPTIONS = [20, 30, 40, 50] as const;

export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number];

export interface PaginationBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Current page size (rows per page). */
  pageSize: number;
  onPageSizeChange?: (pageSize: number) => void;
  /** Allowed page sizes. Defaults to 20, 30, 40, 50. */
  pageSizeOptions?: readonly number[];
  /** First row index shown (1-based, inclusive). */
  from: number;
  /** Last row index shown (1-based, inclusive). */
  to: number;
  /** Total row count across all pages. */
  total: number;
  onPrevious?: () => void;
  onNext?: () => void;
  /** When omitted, derived as `from > 1`. */
  canPrevious?: boolean;
  /** When omitted, derived as `to < total`. */
  canNext?: boolean;
  rowsPerPageLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  /** Disable the entire bar (select + nav). */
  disabled?: boolean;
}

function formatRange(from: number, to: number, total: number): string {
  if (total <= 0) return "Showing 0 of 0";
  return `Showing ${from}\u2013${to} of ${total}`;
}

const PaginationBar = React.forwardRef<HTMLDivElement, PaginationBarProps>(
  (
    {
      className,
      pageSize,
      onPageSizeChange,
      pageSizeOptions = PAGE_SIZE_OPTIONS,
      from,
      to,
      total,
      onPrevious,
      onNext,
      canPrevious,
      canNext,
      rowsPerPageLabel = "Rows per page",
      previousLabel = "Previous page",
      nextLabel = "Next page",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const selectId = React.useId();
    const previousEnabled =
      !disabled && (canPrevious ?? from > 1) && Boolean(onPrevious);
    const nextEnabled =
      !disabled && (canNext ?? to < total) && Boolean(onNext);

    return (
      <div
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn(
          "flex h-[58px] w-full items-center justify-between gap-4",
          "rounded-surface bg-muted-subtle py-2.5 pl-4 pr-3",
          className
        )}
        {...props}
      >
        <div className="flex shrink-0 items-center gap-2">
          <Label
            htmlFor={selectId}
            variant="muted"
            size="md"
            weight="normal"
          >
            {rowsPerPageLabel}
          </Label>
          <div className="w-[92px]">
            <Select
              id={selectId}
              size="sm"
              value={String(pageSize)}
              disabled={disabled}
              onValueChange={(value) => {
                const next = Number(value);
                if (!Number.isNaN(next)) onPageSizeChange?.(next);
              }}
              aria-label={rowsPerPageLabel}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={!previousEnabled}
            onClick={onPrevious}
          >
            {previousLabel}
          </Button>
          <p className="whitespace-nowrap text-sm text-muted-foreground">
            {formatRange(from, to, total)}
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={!nextEnabled}
            onClick={onNext}
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    );
  }
);
PaginationBar.displayName = "PaginationBar";

export { PaginationBar };
