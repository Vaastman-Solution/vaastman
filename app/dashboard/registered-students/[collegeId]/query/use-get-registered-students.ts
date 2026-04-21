"use client";

import { useQuery } from "@tanstack/react-query";
import { getRegisteredStudentsByCollege } from "@/app/dashboard/registered-students/[collegeId]/lib/actions";

export function useGetRegisteredStudents(collegeId: string) {
  return useQuery({
    queryKey: ["registered-students", collegeId],
    queryFn: async () => {
      const res = await getRegisteredStudentsByCollege(collegeId);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },
    enabled: Boolean(collegeId),
    retry: false,
  });
}
