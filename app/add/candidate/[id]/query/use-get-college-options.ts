import { useQuery } from "@tanstack/react-query";
import {
  getCandidateEducationColleges,
  getUniversity,
} from "@/app/add/candidate/[id]/lib/actions";

export function useGetUniversityOptions() {
  return useQuery({
    queryKey: ["candidate-university-options"],
    queryFn: async () => {
      const res = await getUniversity();
      if (!res.success) {
        throw new Error(res.message);
      }
      return res.data;
    },
    retry: false,
  });
}
