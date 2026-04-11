import { z } from "zod";

export const addCandidateEducationSchema = z.object({
  id: z.string(),
  universityRoll: z
    .string()
    .trim()
    .min(1, { error: "University roll is required" }),
  grade: z.string().trim().min(1, { error: "Grade is required" }),
  marks: z
    .string()
    .trim()
    .min(1, { error: "Marks is required" })
    .refine((value) => !Number.isNaN(Number(value)), {
      error: "Marks must be a valid number",
    }),
  collegeName: z.string().trim().min(1, { error: "College name is required" }),
  duration: z.string().trim().min(1, { error: "Duration is required" }),
  domainOrMainSubject: z
    .string()
    .trim()
    .min(1, { error: "Domain/Main subject is required" }),
  mjcSubject: z.string().trim().min(1, { error: "MJC subject is required" }),
});

export type AddCandidateEducationSchema = z.infer<
  typeof addCandidateEducationSchema
>;
