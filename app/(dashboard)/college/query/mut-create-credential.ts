import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCollegeCredential } from "@/app/(dashboard)/college/lib/actions-credential";
import type { CreateCredentialSchema } from "@/app/(dashboard)/college/lib/zod-type/credential";

export function useCreateCollegeCredential() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateCredentialSchema) => {
      const res = await createCollegeCredential(data);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["college-info"] });
      toast.success("Credential created successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
