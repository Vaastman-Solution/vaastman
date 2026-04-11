"use server";

import { prisma } from "@/lib/db";
import { ErrorTypes } from "@/lib/error-type";
import { addCandidatePersonalSchema, AddCandidatePersonalSchema } from "@/lib/zod-type/candidate_personal";

export async function addCandidatePersonalAction(data: AddCandidatePersonalSchema) {
	if (!data.id) {
		return {
			success: false,
			message: "Candidate ID is required",
			errorCode: ErrorTypes.SESSION_EXPIRED
		}
	}

	const parsedData = addCandidatePersonalSchema.safeParse(data);

	if (!parsedData.success) {
		return {
			success: false,
			message: "Invalid data",
			errorCode: ErrorTypes.MISSING_REQUIRED_FIELD
		}
	}


	await prisma.$transaction(async (tx) => {
		// save candidate personal information
		const candidatePersonal = await tx.candidate_Personal.create({
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

}