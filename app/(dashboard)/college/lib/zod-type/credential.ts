import { z } from "zod";

export const createCredentialSchema = z.object({
  collegeId: z.string().min(1, "College ID is required"),
  username: z.string().min(3, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type CreateCredentialSchema = z.infer<typeof createCredentialSchema>;
