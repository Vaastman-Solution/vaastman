"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export type CollegeStudentRow = {
  candidateId: string;
  name: string;
  profilePhoto: string;
  email: string;
  phone: string;
  fatherName: string;
  gender: string;
  dateOfBirth: string;
  universityRoll: string;
  collegeRoll: string;
  domainOrMainSubject: string;
  mjcSubject: string;
  duration: string;
};

export async function getCollegeStudents() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "COLLEGE") {
    return { success: false as const, message: "Unauthorized" };
  }

  const collegeId = session.user.collegeId;

  if (!collegeId) {
    return { success: false as const, message: "No college linked to account" };
  }

  try {
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
      select: {
        id: true,
        name: true,
        code: true,
        university: { select: { name: true } },
        sessions: {
          select: { id: true, name: true },
          orderBy: { name: "asc" },
        },
      },
    });

    if (!college) {
      return { success: false as const, message: "College not found" };
    }

    // Fetch candidate educations — NO payment data is selected
    const candidates = await prisma.candidate_Education.findMany({
      where: { collegeId: college.id },
      include: {
        candidate: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
            email: true,
            phone: true,
            fatherName: true,
            gender: true,
            dateOfBirth: true,
            // candidatePayments is intentionally NOT selected
          },
        },
        collegeSession: {
          select: { id: true, name: true },
        },
      },
    });

    // Group by session ID (not name) to handle duplicate session names
    const candidatesBySessionId = new Map<string, CollegeStudentRow[]>();

    for (const candidate of candidates) {
      const sessionId = candidate.collegeSession.id;
      const grouped = candidatesBySessionId.get(sessionId) ?? [];

      grouped.push({
        candidateId: candidate.candidate.id,
        name: candidate.candidate.name,
        profilePhoto: candidate.candidate.profilePhoto,
        email: candidate.candidate.email,
        phone: candidate.candidate.phone,
        fatherName: candidate.candidate.fatherName,
        gender: candidate.candidate.gender,
        dateOfBirth: candidate.candidate.dateOfBirth,
        universityRoll: candidate.universityRoll,
        collegeRoll: candidate.collegeRoll,
        domainOrMainSubject: candidate.domainOrMainSubject,
        mjcSubject: candidate.mjcSubject,
        duration: candidate.duration,
      });

      candidatesBySessionId.set(sessionId, grouped);
    }

    // Sort students alphabetically within each session
    for (const [sessionId, students] of candidatesBySessionId) {
      students.sort((a, b) => a.name.localeCompare(b.name));
      candidatesBySessionId.set(sessionId, students);
    }

    // Build ordered session list using IDs (configured first, then extras)
    const configuredIds = college.sessions.map((s) => s.id);
    const extraIds = Array.from(candidatesBySessionId.keys())
      .filter((id) => !configuredIds.includes(id))
      .sort();
    const sessionIds = [...configuredIds, ...extraIds];

    // Build a name lookup from configured sessions
    const sessionNameById = new Map(
      college.sessions.map((s) => [s.id, s.name]),
    );

    return {
      success: true as const,
      data: {
        college: {
          id: college.id,
          name: college.name,
          code: college.code,
          universityName: college.university.name.replace(/_/g, " "),
        },
        sessions: sessionIds.map((id) => ({
          id,
          name: sessionNameById.get(id) ?? id,
          students: candidatesBySessionId.get(id) ?? [],
        })),
      },
    };
  } catch (error) {
    console.error("getCollegeStudents error:", error);
    return { success: false as const, message: "Failed to fetch students" };
  }
}
