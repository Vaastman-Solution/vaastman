import { queryOptions } from "@tanstack/react-query";
import { getCollegeInfoById } from "../lib/actions";

export function getCollegeByIdHook(id: string) {
  return queryOptions({
    queryKey: ["college-by-id", id],
    queryFn: async () => {
      const res = await getCollegeInfoById(id);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res.data;
    },
    retry: false,
  });
}