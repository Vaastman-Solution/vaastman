"use client";

import { useQuery } from "@tanstack/react-query";
import { getCollegeStudents } from "@/app/(college-portal)/college-portal/lib/actions";

export function useGetCollegeStudents() {
  return useQuery({
    queryKey: ["college-students"],
    queryFn: async () => {
      const res = await getCollegeStudents();

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },
    retry: false,
  });
}
