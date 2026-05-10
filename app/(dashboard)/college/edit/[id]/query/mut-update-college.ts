import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCollegeInfoById } from "../lib/actions";
import type { IUpdateCollegeSchema } from "../lib/zod-type/type";

export function useUpdateCollegeInfo(collegeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IUpdateCollegeSchema) => {
      const res = await updateCollegeInfoById(collegeId, data);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["college-by-id", collegeId] });
      queryClient.invalidateQueries({ queryKey: ["college-info"] });
      toast.success("College updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
