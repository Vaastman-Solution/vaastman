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
      // Prefer the ACTIVE session fee; if not present, use the last available session.
      const activeSession =
        row.sessions.find((session) => session.status === "ACTIVE") ??
        row.sessions.at(-1);
      return activeSession?.fees ?? "";
    },
    header: "Fee",
    cell: ({ row }) => {
      // Keep the display logic aligned with accessorFn so sorting/filtering and UI match.
      const activeSession =
        row.original.sessions.find((session) => session.status === "ACTIVE") ??
        row.original.sessions.at(-1);
      return <div>{activeSession?.fees ?? "-"}</div>;
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
