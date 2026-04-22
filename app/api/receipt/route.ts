import type { Template } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { text } from "@pdfme/schemas";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import template from "./template.json";

function formatAmount(amountInPaise: number) {
  return `INR ${(amountInPaise / 100).toFixed(2)}`;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-GB").format(value);
}

function toReceiptFileName(name: string) {
  const normalized = name
    .trim()
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, " ");

  return normalized ? `${normalized} - receipt.pdf` : "receipt.pdf";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      candidateId?: string;
    } | null;
    const candidateId = body?.candidateId?.trim();

    if (!candidateId) {
      return NextResponse.json(
        { error: "Candidate ID is required" },
        { status: 400 },
      );
    }

    const candidate = await prisma.candidate_Personal.findUnique({
      where: {
        id: candidateId,
      },
      select: {
        name: true,
        candidateEducations: {
          select: {
            universityRoll: true,
            collegeSession: {
              select: {
                name: true,
              },
            },
          },
          take: 1,
        },
        candidatePayments: {
          where: {
            status: "VERIFIED",
          },
          orderBy: {
            verifiedAt: "desc",
          },
          select: {
            amount: true,
            status: true,
            verifiedAt: true,
            createdAt: true,
          },
          take: 1,
        },
      },
    });

    const education = candidate?.candidateEducations.at(0);
    const payment = candidate?.candidatePayments.at(0);

    if (!candidate || !education || !payment) {
      return NextResponse.json(
        { error: "Receipt data not found for this candidate" },
        { status: 404 },
      );
    }

    const receiptDate = payment.verifiedAt ?? payment.createdAt;

    // Each key in inputs maps to a schema `name` field
    const inputs = [
      {
        candidateName: candidate.name,
        universityRoll: education.universityRoll,
        session: education.collegeSession.name,
        amount: formatAmount(payment.amount),
        paymentStatus: payment.status,
        date: formatDate(receiptDate),
      },
    ];

    const pdf = await generate({
      template: template as unknown as Template,
      inputs,
      plugins: { text },
    });

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${toReceiptFileName(candidate.name)}"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
