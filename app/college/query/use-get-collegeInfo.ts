import { useQuery } from "@tanstack/react-query";
import { getCollegeInfo } from "@/app/college/lib/actions";

export const useGetCollegeInfo = () => {
  return useQuery({
    queryKey: ["college-info"],
    queryFn: async () => {
      const res = await getCollegeInfo();
      if (!res.success) {
        throw new Error(res.message);
      }
      return res.data;
    },
    retry: false,
  });
};
