"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/enums";
import type { IUpdateCollegeSchema } from "./zod-type/type";
import { updateCollegeSchema } from "./zod-type/type";

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
          },
        },
      },
    });

    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to fetch college info" };
  }
}

export async function updateCollegeInfoById(
  id: string,
  data: IUpdateCollegeSchema,
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  if (session.user.role !== Role.ADMIN) {
    return { success: false, message: "Unauthorized" };
  }

  const parsedData = updateCollegeSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data" };
  }

  const normalizedDomains = Array.from(
    new Set(
      (parsedData.data.domains ?? [])
        .map((domain) => domain.trim().replace(/\s+/g, " "))
        .filter(Boolean),
    ),
  );

  try {
    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        sessions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: { id: true },
        },
      },
    });

    if (!college) {
      return { success: false, message: "College not found" };
    }

    if (parsedData.data.code) {
      const existingCollege = await prisma.college.findFirst({
        where: {
          code: parsedData.data.code,
          id: { not: id },
        },
      });

      if (existingCollege) {
        return {
          success: false,
          message: "College with this code already exists",
        };
      }
    }

    const sessionName = `${parsedData.data.startSession}-${parsedData.data.endSession}`;
    const sessionDuration = `${parsedData.data.duration}h`;

    const updatedCollege = await prisma.$transaction(async (tx) => {
      const existingDomains = normalizedDomains.length
        ? await tx.domain.findMany({
            where: {
              name: {
                in: normalizedDomains,
              },
            },
            select: { id: true, name: true },
          })
        : [];
      const existingDomainNames = new Set(
        existingDomains.map((domain) => domain.name),
      );

      const createdDomains = await Promise.all(
        normalizedDomains
          .filter((domain) => !existingDomainNames.has(domain))
          .map((domain) =>
            tx.domain.create({
              data: { name: domain },
              select: { id: true },
            }),
          ),
      );
      const domainIds = [
        ...existingDomains.map((domain) => domain.id),
        ...createdDomains.map((domain) => domain.id),
      ];

      const updated = await tx.college.update({
        where: { id },
        data: {
          name: parsedData.data.collegeName,
          code: parsedData.data.code?.trim() ? parsedData.data.code : null,
          domains: {
            set: [],
            connect: domainIds.map((domainId) => ({ id: domainId })),
          },
        },
        include: {
          domains: true,
          sessions: true,
          university: { select: { name: true } },
        },
      });

      const latestSessionId = college.sessions[0]?.id;

      if (latestSessionId) {
        await tx.collegeSession.update({
          where: { id: latestSessionId },
          data: {
            name: sessionName,
            duration: sessionDuration,
            fees: parsedData.data.fees,
          },
        });
      } else {
        await tx.collegeSession.create({
          data: {
            collegeId: id,
            name: sessionName,
            duration: sessionDuration,
            fees: parsedData.data.fees,
          },
        });
      }

      return updated;
    });

    return { success: true, data: updatedCollege };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to update college info" };
  }
}
