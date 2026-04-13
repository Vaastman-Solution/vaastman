"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  type AddCollegeSchema,
  addCollegeSchema,
} from "./zod-type/college-info";

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

export async function addCollegeInfo(data: AddCollegeSchema) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const parsedData = addCollegeSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data" };
  }

  // check with same code college already exist

  if (parsedData.data.code) {
    const college = await prisma.college.findMany({
      where: {
        code: parsedData.data.code,
      },
    });
    if (college.length > 0) {
      return {
        success: false,
        message: "College with this code already exists",
      };
    }
  }

  try {
    const college = await prisma.college.create({
      data: {
        name: parsedData.data.collegeName,
        code: parsedData.data.code,
        fees: parsedData.data.fees,
        domains: {
          create: parsedData.data.domains?.map((domain) => ({
            name: domain,
          })),
        },
      },
    });

    return { success: true, data: college };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to add college info" };
  }
}
