"use client";

import { useQuery } from "@tanstack/react-query";
import { getAcademicSessions } from "@/app/(dashboard)/academic-session/lib/actions";

export function useGetAcademicSession() {
  return useQuery({
    queryKey: ["academic-session"],
    queryFn: async () => {
      const res = await getAcademicSessions();

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },
    retry: false,
  });
}
