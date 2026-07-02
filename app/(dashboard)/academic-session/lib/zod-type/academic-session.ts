import { z } from "zod";

export const academicSessionRowSchema = z.object({
  id: z.string(),
  name: z.string(),
  start: z.string(),
  end: z.string(),
  duration: z.string(),
  fees: z.string(),
  collegeName: z.string(),
  collegeCode: z.string().nullable(),
  isActive: z.boolean(),
  deprecated: z.boolean(),
});

export const academicSessionListSchema = z.array(academicSessionRowSchema);

export type AcademicSessionRow = z.infer<typeof academicSessionRowSchema>;
