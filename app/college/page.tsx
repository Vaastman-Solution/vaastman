"use client";

import { ErrorDisplay } from "@/components/error-display";
import { LoaderScreen } from "@/components/loader-screen";
import { AddCollege } from "./_components/add-college";
import { type CollegeInfoRow, columns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { useGetCollegeInfo } from "./query/use-get-collegeInfo";

export default function CollegePage() {
  const { data, isPending, error } = useGetCollegeInfo();
  const tableData: CollegeInfoRow[] = data ?? [];
  // get all domains name for auto complete when adding new college
  const domainOptions = Array.from(
    new Set(
      tableData.flatMap((college) =>
        college.domains
          .map((domain) => domain.name.trim())
          .filter((domainName) => domainName.length > 0),
      ),
    ),
  ).sort((a, b) => a.localeCompare(b));

  if (isPending) {
    return <LoaderScreen message="Getting colleges list..." />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={error.message}
        redirectPath="/signin"
        buttonText="Back to Signin Page"
      />
    );
  }

  return (
    <div className="container mx-auto py-10">
      <AddCollege domainOptions={domainOptions} />
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
