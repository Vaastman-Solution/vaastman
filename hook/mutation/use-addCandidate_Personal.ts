import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addCandidatePersonalAction } from "@/lib/actions/mutation/add_candidate";
import type { AddCandidatePersonalSchema } from "@/lib/zod-type/candidate_personal";

export function useAddCandidatePersonal({
  candidateId,
}: {
  candidateId: string;
}) {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: AddCandidatePersonalSchema) => {
      const res = await addCandidatePersonalAction(data);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Personal details saved.");
      router.push(`/add/candidate/${candidateId}?tab=education`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
