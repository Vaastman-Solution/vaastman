import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addCollegeInfo } from "@/app/college/lib/actions";
import type { AddCollegeSchema } from "../lib/zod-type/college-info";

export function useAddCollegeInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AddCollegeSchema) => {
      const res = await addCollegeInfo(data);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["college-info"] });
      toast.success("College added successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
