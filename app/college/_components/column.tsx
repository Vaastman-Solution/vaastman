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
      return <div>{`${row.original.name} [${row.original.code}]`}</div>;
    },
  },
  {
    accessorKey: "fees",
    header: "Fee",
    cell: ({ row }) => {
      return <div>{row.original.fees}</div>;
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
    header: "Domains",
    cell: ({ row }) => (
      <button type="button" onClick={row.getToggleExpandedHandler()}>
        {row.getIsExpanded() ? "▼" : "▶"}
      </button>
    ),
  },
];
