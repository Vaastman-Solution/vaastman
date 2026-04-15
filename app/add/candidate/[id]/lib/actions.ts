"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import {
  type AddCandidateEducationSchema,
  addCandidateEducationSchema,
} from "./zod-type/candidate-education";
import {
  type AddCandidatePersonalSchema,
  addCandidatePersonalSchema,
} from "./zod-type/candidate-personal";

export async function addCandidatePersonalAction(
  data: AddCandidatePersonalSchema,
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const parsedData = addCandidatePersonalSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.issues[0]?.message ?? "Invalid data",
    };
  }

  const candidate = await prisma.candidate_Personal.findUnique({
    where: { id: parsedData.data.id },
  });

  if (candidate) {
    return { success: false, message: "Candidate already exists" };
  }

  try {
    const createdCandidate = await prisma.candidate_Personal.create({
      data: parsedData.data,
    });

    return { success: true, data: createdCandidate };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, message: "Unable to save candidate details" };
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return { success: false, message: "Invalid candidate details" };
    }

    return {
      success: false,
      message: "Something went wrong while saving candidate details",
    };
  }
}

export async function addCandidateEducationAction(
  data: AddCandidateEducationSchema,
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const parsedData = addCandidateEducationSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.issues[0]?.message ?? "Invalid data",
    };
  }

  const candidatePersonal = await prisma.candidate_Personal.findUnique({
    where: { id: parsedData.data.id },
  });

  if (!candidatePersonal) {
    return { success: false, message: "Candidate personal details not found" };
  }

  const education = await prisma.candidate_Education.findFirst({
    where: { candidateId: parsedData.data.id },
  });

  if (education) {
    return { success: false, message: "Candidate education already exists" };
  }

  try {
    const createdEducation = await prisma.candidate_Education.create({
      data: {
        candidateId: parsedData.data.id,
        universityRoll: parsedData.data.universityRoll,
        grade: parsedData.data.grade,
        marks: Number(parsedData.data.marks),
        collegeName: parsedData.data.collegeName,
        duration: parsedData.data.duration,
        domainOrMainSubject: parsedData.data.domainOrMainSubject,
        mjcSubject: parsedData.data.mjcSubject,
      },
    });

    return { success: true, data: createdEducation };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, message: "Unable to save candidate details" };
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return { success: false, message: "Invalid candidate details" };
    }

    return {
      success: false,
      message: "Something went wrong while saving candidate details",
    };
  }
}
