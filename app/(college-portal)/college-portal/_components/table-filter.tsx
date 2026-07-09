"use client";

import { IconFilterFilled } from "@tabler/icons-react";
import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type TableFilterProps<TData> = {
  column: Column<TData>;
  title: string;
  options: string[];
};

export function TableFilter<TData>({
  column,
  title,
  options,
}: TableFilterProps<TData>) {
  const selectedValue = (column.getFilterValue() as string) ?? "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          data-active={Boolean(selectedValue) || undefined}
        >
          <IconFilterFilled className="size-5" />
          {title}
          {selectedValue && (
            <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-primary">
              {selectedValue}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-52 p-0">
        <div className="px-3 py-2 text-sm font-medium">{title}</div>
        <Separator />
        <ScrollArea className="max-h-56">
          <div className="p-1">
            <button
              type="button"
              onClick={() => column.setFilterValue(undefined)}
              className={`w-full rounded-sm px-2 py-1.5 text-left text-sm transition-colors ${
                !selectedValue ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
            >
              All
            </button>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => column.setFilterValue(option)}
                className={`w-full rounded-sm px-2 py-1.5 text-left text-sm transition-colors ${
                  selectedValue === option
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
