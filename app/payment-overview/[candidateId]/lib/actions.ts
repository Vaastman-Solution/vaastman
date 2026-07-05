"use server";

import { prisma } from "@/lib/db";

/**
 * Fetches the data needed to render an Internship Offer Letter.
 * Only returns data when the candidate has a VERIFIED payment.
 * Intentionally excludes payment/transaction details.
 * @param candidateId - The ID of the candidate
 */
export async function getOfferLetterData(candidateId: string) {
  const normalizedCandidateId = candidateId.trim();

  if (!normalizedCandidateId) {
    return { success: false, message: "Invalid candidate id" };
  }

  try {
    const candidate = await prisma.candidate_Personal.findUnique({
      where: {
        id: normalizedCandidateId,
      },
      select: {
        name: true,
        fatherName: true,
        candidateEducations: {
          select: {
            collegeRoll: true,
            mjcSubject: true,
            domainOrMainSubject: true,
          },
          take: 1,
        },
        candidatePayments: {
          where: {
            status: "VERIFIED",
          },
          select: {
            id: true,
          },
          take: 1,
        },
      },
    });

    const education = candidate?.candidateEducations.at(0);
    const payment = candidate?.candidatePayments.at(0);

    if (!candidate || !education || !payment) {
      return {
        success: false,
        message: "Offer letter data not found for this candidate",
      };
    }

    return {
      success: true,
      data: {
        year: new Date().getFullYear().toString(),
        registrationNumber: normalizedCandidateId,
        issueDate: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        studentName: candidate.name,
        fatherName: candidate.fatherName,
        mjcSubject: education.mjcSubject,
        internshipDomain: education.domainOrMainSubject,
        collegeRoll: education.collegeRoll,
      },
    };
  } catch {
    return { success: false, message: "Failed to fetch offer letter data" };
  }
}
