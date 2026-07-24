import { z } from "zod";
import { parseCsvDate } from "../csv-helpers";

/**
 * Zod schema for validating a raw CSV row (all string values).
 * Used on the client side to validate the parsed CSV data.
 */
export const csvRowSchema = z.object({
  name: z.string().min(1, "Name is required"),
  father_name: z.string().min(1, "Father name is required"),
  course_name: z
    .string()
    .min(1, "Course name is required")
    .refine(
      (val) => {
        const norm = val.trim().toLowerCase();
        return (
          norm === "b.sc" ||
          norm === "bsc" ||
          norm === "b.a" ||
          norm === "ba" ||
          norm === "b.com" ||
          norm === "bcom"
        );
      },
      {
        message:
          "Invalid course name. Allowed courses are strictly B.Sc, B.A, or B.Com.",
      },
    ),

  university_roll_no: z.string().min(1, "University roll no is required"),
  marks: z.string(),
  registration_no: z.string().min(1, "Registration no is required"),
  college_name: z.string().min(1, "College name is required"),
  short_clg_name_for_certificate: z
    .string()
    .min(1, "Short college name for certificate is required")
    .refine((val) => !/\s/.test(val.trim()), {
      message:
        "Short college name must be a single word (e.g. RDS, VLC, BS). Multi-word values like 'RDS COLLEGE' are not allowed.",
    }),
  mobile_no: z.string().min(1, "Mobile no is required"),
  email_id: z.string(),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  honours_subject: z.string().min(1, "Honours subject is required"),
  issue_date: z
    .string()
    .min(1, "Issue date is required")
    .refine(
      (val) => {
        try {
          parseCsvDate(val);
          return true;
        } catch {
          return false;
        }
      },
      {
        message:
          "Invalid issue date format. Expected DD/MM/YYYY or DD-MM-YYYY (e.g. 21/07/2026 or 15-08-2025).",
      },
    ),
});

export type CsvRowInput = z.infer<typeof csvRowSchema>;

/**
 * Schema for the full upload payload sent to the server action.
 * Marks and email are kept as strings — the server action does the
 * transformation (string → number | null, empty → null).
 */
export const uploadPayloadSchema = z.object({
  rows: z.array(csvRowSchema).min(1, "At least one row is required"),
});

export type UploadPayloadSchema = z.infer<typeof uploadPayloadSchema>;
