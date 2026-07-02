"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { AcademicSessionRow } from "../lib/zod-type/academic-session";

export const columns: ColumnDef<AcademicSessionRow>[] = [
  {
    accessorKey: "name",
    header: "Session",
  },
  {
    accessorKey: "start",
    header: "Start",
    cell: ({ row }) => row.original.start || "-",
  },
  {
    accessorKey: "end",
    header: "End",
    cell: ({ row }) => row.original.end || "-",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "fees",
    header: "Fees",
  },
  {
    id: "college",
    header: "College",
    cell: ({ row }) => {
      const { collegeName, collegeCode } = row.original;

      return `${collegeName}${collegeCode ? ` [${collegeCode}]` : ""}`;
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.deprecated) {
        return <Badge variant="outline">Deprecated</Badge>;
      }

      if (row.original.isActive) {
        return <Badge>Active</Badge>;
      }

      return <Badge variant="secondary">Inactive</Badge>;
    },
  },
];
