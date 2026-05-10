"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type OverviewFilterProps = {
  fromDateDraft: string;
  toDateDraft: string;
  isDateFiltered: boolean;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
  appliedFromDate: string;
  appliedToDate: string;
};

export function OverviewFilter({
  fromDateDraft,
  toDateDraft,
  isDateFiltered,
  onFromDateChange,
  onToDateChange,
  onApply,
  onClear,
  appliedFromDate,
  appliedToDate,
}: OverviewFilterProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]">
        <Input
          type="date"
          value={fromDateDraft}
          onChange={(event) => onFromDateChange(event.target.value)}
        />
        <Input
          type="date"
          value={toDateDraft}
          onChange={(event) => onToDateChange(event.target.value)}
        />
        <Button type="button" onClick={onApply}>
          Apply filter
        </Button>
        <Button type="button" variant="outline" onClick={onClear}>
          Clear
        </Button>
      </div>
      {isDateFiltered ? (
        <p className="text-sm text-muted-foreground">
          Showing results from{" "}
          <span className="font-medium">{appliedFromDate || "start"}</span> to{" "}
          <span className="font-medium">{appliedToDate || "today"}</span>.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">No date filter applied.</p>
      )}
    </div>
  );
}
