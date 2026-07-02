"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CollegeSessionStatus } from "@/lib/generated/prisma/enums";
import { academicSessionListSchema } from "./zod-type/academic-session";

function splitSessionName(name: string) {
  const [start = "", end = ""] = name.split("-").map((part) => part.trim());

  return {
    start,
    end,
  };
}

export async function getAcademicSessions() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const sessions = await prisma.collegeSession.findMany({
      select: {
        id: true,
        name: true,
        duration: true,
        fees: true,
        status: true,
        isActive: true,
        deprecated: true,
        college: {
          select: {
            name: true,
            code: true,
          },
        },
      },
      orderBy: [{ isActive: "desc" }, { createdAt: "desc" }],
    });

    const data = sessions.map((session) => {
      const { start, end } = splitSessionName(session.name);
      const isActive =
        session.isActive && session.status === CollegeSessionStatus.ACTIVE;
      const deprecated =
        session.deprecated || session.status === CollegeSessionStatus.INACTIVE;

      return {
        id: session.id,
        name: session.name,
        start,
        end,
        duration: session.duration,
        fees: session.fees,
        collegeName: session.college.name,
        collegeCode: session.college.code,
        isActive,
        deprecated,
      };
    });

    const parsedData = academicSessionListSchema.safeParse(data);

    if (!parsedData.success) {
      return { success: false, message: "Invalid academic session data" };
    }

    return { success: true, data: parsedData.data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to fetch academic sessions" };
  }
}
