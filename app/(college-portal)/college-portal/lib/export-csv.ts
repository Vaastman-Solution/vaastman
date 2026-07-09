import type { CollegeStudentRow } from "./actions";

const csvColumns = [
  { key: "universityRoll", label: "University Roll Number" },
  { key: "collegeRoll", label: "College Roll Number" },
  { key: "name", label: "Student Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone Number" },
  { key: "fatherName", label: "Father Name" },
  { key: "gender", label: "Gender" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "domainOrMainSubject", label: "Domain / Main Subject" },
  { key: "mjcSubject", label: "MJC Subject" },
  { key: "duration", label: "Duration" },
] as const;

type CsvColumnKey = (typeof csvColumns)[number]["key"];

function toCsvValue(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).replace(/"/g, '""');
}

function toFileNamePart(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function downloadCollegeStudentsCsv({
  collegeName,
  sessionName,
  students,
}: {
  collegeName: string;
  sessionName: string;
  students: ReadonlyArray<Pick<CollegeStudentRow, CsvColumnKey>>;
}) {
  const header = csvColumns
    .map((col) => `"${toCsvValue(col.label)}"`)
    .join(",");

  const rows = students.map((student) =>
    csvColumns.map((col) => `"${toCsvValue(student[col.key])}"`).join(","),
  );

  const csvContent = [header, ...rows].join("\n");
  const blob = new Blob([`\uFEFF${csvContent}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const collegePart = toFileNamePart(collegeName) || "college";
  const sessionPart = toFileNamePart(sessionName) || "session";

  link.href = url;
  link.download = `${collegePart}-${sessionPart}-students.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
