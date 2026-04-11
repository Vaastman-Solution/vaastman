import { addCandidatePersonalAction } from "@/lib/actions/mutation/add_candidate";
import { AddCandidatePersonalSchema } from "@/lib/zod-type/candidate_personal";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useAddCandidatePersonal({ candidateId }: { candidateId: string }) {



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
		},
		onError: (error) => {
			toast.error(error.message);
		}
	})


}