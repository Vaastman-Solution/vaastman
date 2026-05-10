"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { DashboardOverviewInput } from "./dashboard-overview";
import { resolveOverviewDateRange } from "./dashboard-overview";

export async function getDashboardOverview(input: DashboardOverviewInput = {}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const dateRange = resolveOverviewDateRange(input);
  if (dateRange.error) {
    return { success: false, message: dateRange.error };
  }

  const createdAtFilter =
    dateRange.fromDate || dateRange.toDate
      ? {
          ...(dateRange.fromDate && { gte: dateRange.fromDate }),
          ...(dateRange.toDate && { lte: dateRange.toDate }),
        }
      : undefined;

  try {
    const [colleges, students, registrations] = await Promise.all([
      prisma.college.count({
        where: createdAtFilter ? { createdAt: createdAtFilter } : undefined,
      }),
      prisma.candidate_Personal.count(),
      prisma.candidate_Education.count(),
    ]);

    return {
      success: true,
      data: {
        range: {
          from: dateRange.from ?? null,
          to: dateRange.to ?? null,
          isFiltered: Boolean(dateRange.from || dateRange.to),
        },
        metrics: {
          colleges,
          students,
          registrations,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to get dashboard overview" };
  }
}
