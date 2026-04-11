"use server";

import { prisma } from "@/lib/db";
import { ErrorTypes } from "@/lib/error-type";
import { Prisma } from "@/lib/generated/prisma/client";
import { addCandidatePersonalSchema, AddCandidatePersonalSchema } from "@/lib/zod-type/candidate_personal";

export async function addCandidatePersonalAction(data: AddCandidatePersonalSchema) {
	if (!data.id) {
		return {
			success: false,
			message: "Candidate ID is required",
			errorCode: ErrorTypes.SESSION_EXPIRED
		}
	}

	// check user already exists
	const user = await prisma.candidate_Personal.findUnique({
		where: {
			id: data.id
		}
	})

	if (user) {
		return {
			success: false,
			message: "Candidate already exists",
			errorCode: ErrorTypes.DUPLICATE
		}
	}

	const parsedData = addCandidatePersonalSchema.safeParse(data);

	if (!parsedData.success) {
		return {
			success: false,
			message: parsedData.error.issues[0]?.message ?? "Invalid data",
			errorCode: ErrorTypes.VALIDATION
		}
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
				}
			})
		})

		return {
			success: true,
			errorCode: null
		}
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				success: false,
				message: "Unable to save candidate details",
				errorCode: ErrorTypes.DATABASE_ERROR
			}
		}

		if (error instanceof Prisma.PrismaClientValidationError) {
			return {
				success: false,
				message: "Invalid candidate details",
				errorCode: ErrorTypes.INVALID_INPUT
			}
		}

		return {
			success: false,
			message: "Something went wrong while saving candidate details",
			errorCode: ErrorTypes.SERVER_ERROR
		}
	}
}
