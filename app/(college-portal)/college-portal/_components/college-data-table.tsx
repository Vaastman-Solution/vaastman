"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableFilter } from "./table-filter";

interface CollegeDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Column keys that should have dropdown filters, with their display title. */
  filterableColumns?: { columnId: string; title: string }[];
}

export function CollegeDataTable<TData, TValue>({
  columns,
  data,
  filterableColumns = [],
}: CollegeDataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, globalFilter },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Compute unique values for each filterable column from the data
  const filterOptions = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const { columnId } of filterableColumns) {
      const unique = new Set<string>();
      for (const row of data) {
        const value = (row as Record<string, unknown>)[columnId];
        if (typeof value === "string" && value.trim()) {
          unique.add(value);
        }
      }
      result[columnId] = Array.from(unique).sort((a, b) =>
        a.localeCompare(b),
      );
    }
    return result;
  }, [data, filterableColumns]);

  const hasActiveFilters = columnFilters.length > 0 || globalFilter.length > 0;

  const clearAllFilters = () => {
    setColumnFilters([]);
    setGlobalFilter("");
  };

  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-64">
          <IconSearch className="absolute left-2.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>

        {filterableColumns.map(({ columnId, title }) => {
          const column = table.getColumn(columnId);
          if (!column) return null;
          return (
            <TableFilter
              key={columnId}
              column={column}
              title={title}
              options={filterOptions[columnId] ?? []}
            />
          );
        })}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="gap-1 text-xs"
          >
            <IconX className="size-5" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="even:bg-muted/20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Row count */}
      <p className="text-xs text-muted-foreground">
        Showing {table.getRowModel().rows.length} of {data.length} students
      </p>
    </div>
  );
}
