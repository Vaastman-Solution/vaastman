"use server";

import { prisma } from "@/lib/db";
import { ErrorTypes } from "@/lib/error-type";
import { Prisma } from "@/lib/generated/prisma/client";
import {
  type AddCandidateEducationSchema,
  addCandidateEducationSchema,
} from "@/lib/zod-type/candidate_education";
import {
  type AddCandidatePersonalSchema,
  addCandidatePersonalSchema,
} from "@/lib/zod-type/candidate_personal";

export async function addCandidatePersonalAction(
  data: AddCandidatePersonalSchema,
) {
  if (!data.id) {
    return {
      success: false,
      message: "Candidate ID is required",
      errorCode: ErrorTypes.SESSION_EXPIRED,
    };
  }

  // check user already exists
  const user = await prisma.candidate_Personal.findUnique({
    where: {
      id: data.id,
    },
  });

  if (user) {
    return {
      success: false,
      message: "Candidate already exists",
      errorCode: ErrorTypes.DUPLICATE,
    };
  }

  const parsedData = addCandidatePersonalSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.issues[0]?.message ?? "Invalid data",
      errorCode: ErrorTypes.VALIDATION,
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.candidate_Personal.create({
        data: {
          id: parsedData.data.id,
          name: parsedData.data.name,
          email: parsedData.data.email,
          phone: parsedData.data.phone,
          fatherName: parsedData.data.fatherName,
          profilePhoto: parsedData.data.profilePhoto,
          gender: parsedData.data.gender,
          dateOfBirth: parsedData.data.dateOfBirth,
        },
      });
    });

    return {
      success: true,
      errorCode: null,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        message: "Unable to save candidate details",
        errorCode: ErrorTypes.DATABASE_ERROR,
      };
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        success: false,
        message: "Invalid candidate details",
        errorCode: ErrorTypes.INVALID_INPUT,
      };
    }

    return {
      success: false,
      message: "Something went wrong while saving candidate details",
      errorCode: ErrorTypes.SERVER_ERROR,
    };
  }
}

export async function addCandidateEducationAction(
  data: AddCandidateEducationSchema,
) {
  if (!data.id) {
    return {
      success: false,
      message: "Candidate ID is required",
      errorCode: ErrorTypes.SESSION_EXPIRED,
    };
  }

  // Education can only be added after personal details exist.
  const candidatePersonal = await prisma.candidate_Personal.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!candidatePersonal) {
    return {
      success: false,
      message: "Candidate personal details not found",
      errorCode: ErrorTypes.NOT_FOUND,
    };
  }

  // Prevent duplicate education records for the same candidate.
  const education = await prisma.candidate_Education.findFirst({
    where: {
      candidateId: data.id,
    },
  });

  if (education) {
    return {
      success: false,
      message: "Candidate education already exists",
      errorCode: ErrorTypes.DUPLICATE,
    };
  }

  const parsedData = addCandidateEducationSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.issues[0]?.message ?? "Invalid data",
      errorCode: ErrorTypes.VALIDATION,
    };
  }

  try {
    // Persist a single education entry linked to this candidate.
    await prisma.$transaction(async (tx) => {
      await tx.candidate_Education.create({
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
    });

    return {
      success: true,
      errorCode: null,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        message: "Unable to save candidate details",
        errorCode: ErrorTypes.DATABASE_ERROR,
      };
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        success: false,
        message: "Invalid candidate details",
        errorCode: ErrorTypes.INVALID_INPUT,
      };
    }

    return {
      success: false,
      message: "Something went wrong while saving candidate details",
      errorCode: ErrorTypes.SERVER_ERROR,
    };
  }
}
