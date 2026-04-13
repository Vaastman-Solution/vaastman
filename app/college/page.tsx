"use client";

import { type CollegeInfoRow, columns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { useGetCollegeInfo } from "./query/use-get-collegeInfo";

export default function CollegePage() {
  const { data, isPending, isError, error } = useGetCollegeInfo();
  const tableData: CollegeInfoRow[] = data ?? [];

  if (isPending) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10 text-destructive">
        {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={tableData}
        // Render domains inside each row's expandable section.
        renderExpandedRow={(row) => (
          <div className="space-y-2 p-2">
            <p className="text-sm font-medium">Domains</p>
            {row.domains.length ? (
              <div className="flex flex-wrap gap-2">
                {row.domains.map((domain) => (
                  <span
                    key={domain.id}
                    className="rounded-md bg-muted px-2 py-1 text-xs"
                  >
                    {domain.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No domains.</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
