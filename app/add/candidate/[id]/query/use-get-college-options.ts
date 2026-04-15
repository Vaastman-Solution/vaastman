import { useQuery } from "@tanstack/react-query";
import { getCandidateEducationColleges } from "@/app/add/candidate/[id]/lib/actions";

export function useGetCollegeOptions() {
  return useQuery({
    queryKey: ["candidate-college-options"],
    queryFn: async () => {
      const res = await getCandidateEducationColleges();
      if (!res.success) {
        throw new Error(res.message);
      }
      return res.data;
    },
    retry: false,
  });
}
