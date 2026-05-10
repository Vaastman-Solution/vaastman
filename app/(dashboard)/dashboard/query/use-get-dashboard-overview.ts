"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "@/app/(dashboard)/lib/actions";
import type { DashboardOverviewInput } from "@/app/(dashboard)/lib/dashboard-overview";

export const useGetDashboardOverview = (input: DashboardOverviewInput) => {
  return useQuery({
    queryKey: ["dashboard-overview", input.from ?? "", input.to ?? ""],
    queryFn: async () => {
      const res = await getDashboardOverview(input);
      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },
    retry: false,
  });
};
