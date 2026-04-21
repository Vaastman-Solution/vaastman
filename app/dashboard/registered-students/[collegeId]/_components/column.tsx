"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { useGetRegisteredStudents } from "@/app/dashboard/registered-students/[collegeId]/query/use-get-registered-students";

export type RegisteredStudentsRow = NonNullable<
  ReturnType<typeof useGetRegisteredStudents>["data"]
>["sessions"][number]["candidates"][number];

export const columns: ColumnDef<RegisteredStudentsRow>[] = [
  {
    accessorKey: "name",
    header: "Candidate Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "universityRoll",
    header: "University Roll",
  },
  {
    accessorKey: "domainOrMainSubject",
    header: "Domain/Main Subject",
  },
  {
    accessorKey: "mjcSubject",
    header: "MJC Subject",
  },
];
