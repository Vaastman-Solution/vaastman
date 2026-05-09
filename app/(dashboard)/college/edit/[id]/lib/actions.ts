"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/enums";
import { headers } from "next/headers";

export async function getCollegeInfoById(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  if (session.user.role !== Role.ADMIN) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const data = await prisma.college.findUnique({
      where: {
        id,
      },
      include: {
        domains: true,
        sessions: true,
        university: {
          select: {
            name: true,
          }
        }
      },
    });

    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to fetch college info" };
  }
}