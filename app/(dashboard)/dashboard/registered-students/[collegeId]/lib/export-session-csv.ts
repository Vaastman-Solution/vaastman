const csvColumns = [
  { key: "name", label: "Candidate Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "universityRoll", label: "University Roll" },
  { key: "domainOrMainSubject", label: "Domain/Main Subject" },
  { key: "mjcSubject", label: "MJC Subject" },
  { key: "fatherName", label: "Father Name" },
  { key: "gender", label: "Gender" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "duration", label: "Duration" },
  { key: "collegeFee", label: "College Fee" },
] as const;

type CsvColumnKey = (typeof csvColumns)[number]["key"];

type CsvCandidate = Record<CsvColumnKey, string>;

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

export function downloadRegisteredStudentsSessionCsv({
  collegeName,
  sessionName,
  candidates,
}: {
  collegeName: string;
  sessionName: string;
  candidates: ReadonlyArray<CsvCandidate>;
}) {
  const header = csvColumns
    .map((column) => `"${toCsvValue(column.label)}"`)
    .join(",");
  const rows = candidates.map((candidate) => {
    return csvColumns
      .map((column) => `"${toCsvValue(candidate[column.key])}"`)
      .join(",");
  });
  const csvContent = [header, ...rows].join("\n");
  const blob = new Blob([`\uFEFF${csvContent}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const collegePart = toFileNamePart(collegeName) || "college";
  const sessionPart = toFileNamePart(sessionName) || "session";

  link.href = url;
  link.download = `${collegePart}-${sessionPart}-registered-students.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
