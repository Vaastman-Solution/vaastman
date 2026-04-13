import z from "zod";

export const addCollegeSchema = z.object({
  collegeName: z.string().min(1, "College name is required"),
  code: z.string().optional(),
  fees: z.string().min(1, "Fees is required"),
  domains: z.array(z.string()).optional(),
});

export type AddCollegeSchema = z.infer<typeof addCollegeSchema>;
