"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { CollegeStudentRow } from "@/app/(college-portal)/college-portal/lib/actions";
import { StudentCell } from "./student-cell";

export const columns: ColumnDef<CollegeStudentRow>[] = [
  {
    id: "candidate",
    header: "Student",
    cell: ({ row }) => (
      <StudentCell
        name={row.original.name}
        profilePhoto={row.original.profilePhoto}
        universityRoll={row.original.universityRoll}
        collegeRoll={row.original.collegeRoll}
      />
    ),
    // Enable global-filter matching on the student name
    filterFn: "includesString",
    accessorFn: (row) => row.name,
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
    accessorKey: "fatherName",
    header: "Father's Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    filterFn: "equals",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
  },
  {
    accessorKey: "domainOrMainSubject",
    header: "Domain",
    filterFn: "equals",
  },
  {
    accessorKey: "mjcSubject",
    header: "MJC Subject",
    filterFn: "equals",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
];
