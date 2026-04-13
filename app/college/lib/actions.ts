"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function getCollegeInfo() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const data = await prisma.college.findMany({
      include: {
        domains: true,
      },
    });

    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to fetch college info" };
  }
}
