import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addCandidateEducationAction } from "@/lib/actions/mutation/add_candidate";
import type { AddCandidateEducationSchema } from "@/lib/zod-type/candidate_education";

export function useAddCandidateEducation({
  candidateId,
}: {
  candidateId: string;
}) {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: AddCandidateEducationSchema) => {
      const res = await addCandidateEducationAction(data);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Education details saved.");
      router.push(`/add/candidate/${candidateId}?tab=education`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
