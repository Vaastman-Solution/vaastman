"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { useGetCollegeInfo } from "@/app/college/query/use-get-collegeInfo";

export type CollegeInfoRow = NonNullable<
  ReturnType<typeof useGetCollegeInfo>["data"]
>[number];

export const columns: ColumnDef<CollegeInfoRow>[] = [
  {
    accessorKey: "name",
    header: "College Name",
    cell: ({ row }) => {
      return (
        <div>
          {`${row.original.name} ${row.original.code ? `[${row.original.code}]` : ""}`}
        </div>
      );
    },
  },
  {
    id: "fees",
    accessorFn: (row) => {
      // Use session count for a compact table view; session fee details are in expanded row.
      return row.sessions.length;
    },
    header: "Fee",
    cell: ({ row }) => {
      const sessionCount = row.original.sessions.length;

      if (!sessionCount) {
        return <div>-</div>;
      }

      return <div>{sessionCount} session(s)</div>;
    },
  },

  // {
  //   accessorKey: "domains",
  //   header: "Domains",
  //   cell: ({ row }) => {
  //     return <div>{row.original.domains.join(", ")}</div>;
  //   },
  // },

  {
    id: "expander",
    header: "Details",
    cell: ({ row }) => (
      <button type="button" onClick={row.getToggleExpandedHandler()}>
        {row.getIsExpanded() ? "▼" : "▶"}
      </button>
    ),
  },
];
