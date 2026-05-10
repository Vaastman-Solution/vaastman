import { z } from "zod";

export const updateCollegeSchema = z.object({
  collegeName: z.string().min(1, "College name is required"),
  code: z.string().optional(),
  startSession: z.string().min(1, "Start session is required"),
  endSession: z.string().min(1, "End session is required"),
  duration: z.string().min(1, "Duration is required"),
  fees: z.string().min(1, "Fees is required"),
  domains: z.array(z.string()).optional(),
});

export type IUpdateCollegeSchema = z.infer<typeof updateCollegeSchema>;

export const updateCollegeSchemaPartial = updateCollegeSchema.partial();

export type IUpdateCollegeSchemaPartial = z.infer<
  typeof updateCollegeSchemaPartial
>;
