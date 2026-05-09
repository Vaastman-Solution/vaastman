import { UniversityName } from "@/lib/generated/prisma/enums";
import {z} from "zod";

export const addCollegeSchema = z.object({
  universityName: z.enum(UniversityName),
  collegeName: z.string().min(1, "College name is required"),
  code: z.string().optional(),
  startSession: z.string().min(1, "Start session is required"),
  endSession: z.string().min(1, "End session is required"),
  duration: z.string().min(1, "Duration is required"),
  fees: z.string().min(1, "Fees is required"),
  domains: z.array(z.string()).optional(),
});

export type AddCollegeSchema = z.infer<typeof addCollegeSchema>;

// type for update college info
export const updateCollegeSchema = addCollegeSchema.partial();

export type UpdateCollegeSchema = z.infer<typeof updateCollegeSchema>;

