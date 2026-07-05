"use client";

import { Baskervville } from "next/font/google";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

const baskervville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

export type OfferLetterData = {
  year: string;
  registrationNumber: string;
  issueDate: string;
  studentName: string;
  fatherName: string;
  mjcSubject: string;
  internshipDomain: string;
  collegeRoll: string;
};

type OfferLetterProps = {
  data: OfferLetterData;
};

/**
 * Printable Internship Offer Letter.
 * Renders on screen and formats itself for a clean single A4 page when printed.
 * The print button is handled by the parent layout.
 */
export function OfferLetter({ data }: OfferLetterProps) {
  return (
    <article
      id="offer-letter"
      className="mx-auto w-full max-w-3xl bg-white px-6 py-8 text-black shadow-lg print:max-w-none print:px-8 print:py-6 print:shadow-none"
    >
      {/* Letterhead */}
      <div className="mb-8 flex items-center justify-center border-b-2 border-black pb-4 text-center">
        <div className="mr-4 flex-shrink-0">
          <Image
            src="/company-logo-white.png"
            alt="Vaastman Logo"
            width={64}
            height={64}
            className="object-contain mix-blend-multiply"
          />
        </div>
        <div>
          <h1
            className={`${baskervville.className} text-3xl font-black font-extrabold uppercase tracking-wide`}
          >
            Vaastman Solutions Pvt. Ltd.
          </h1>
          {/* <p className="mt-1 text-xs">Internship Program</p> */}
        </div>
      </div>

      {/* Ref / Date */}
      <div className="mb-6 flex justify-between text-[13px] leading-none">
        <p>
          <span className="font-semibold">Ref. No.: </span>
          VSPL/INT/{data.year}/{data.registrationNumber}
        </p>
        <p>
          <span className="font-semibold">Date: </span>
          {data.issueDate}
        </p>
      </div>

      <h2 className="mb-6 text-center text-lg font-bold uppercase">
        Internship Offer Letter
      </h2>

      <p className="mb-2 text-[13px] leading-none font-bold">
        Subject: Offer of Internship
      </p>

      <p className="mb-1 text-[13px] leading-none">
        Dear <span className="font-semibold">{data.studentName}</span>,
      </p>

      <div className="mb-1 text-justify text-[13px] leading-none">
        We are pleased to offer you an internship opportunity with{" "}
        <span className="font-semibold">Vaastman Solutions Pvt. Ltd.</span> in
        accordance with the Internship Program conducted under the academic
        framework of your institution.
      </div>

      <div className="mb-2 text-justify text-[13px] leading-none">
        Based on your application and eligibility, you have been selected for
        the internship program. We believe that this internship will provide
        valuable practical exposure, professional experience, and
        industry-oriented learning relevant to your academic background.
      </div>

      {/* Details table */}
      <div className="mb-4 overflow-hidden rounded-md border border-black">
        <table className="w-full border-collapse text-[13px] leading-none">
          <tbody>
            <DetailRow label="Student Name" value={data.studentName} />
            <DetailRow
              label="Registration Number"
              value={data.registrationNumber}
            />
            <DetailRow label="Father's Name" value={data.fatherName} />
            <DetailRow label="Major Subject (MJC)" value={data.mjcSubject} />
            <DetailRow
              label="Internship Domain"
              value={data.internshipDomain}
            />
            <DetailRow label="College Roll" value={data.collegeRoll} last />
          </tbody>
        </table>
      </div>

      {/* Terms & Conditions */}
      <h3 className="mb-2 text-[13px] leading-none font-bold uppercase">
        Terms &amp; Conditions
      </h3>
      <ol className="mb-4 list-decimal space-y-1 pl-5 text-[13px] leading-none">
        <li>
          The intern shall maintain discipline, professionalism, and ethical
          conduct throughout the internship period.
        </li>
        <li>
          Regular attendance and timely completion of assigned tasks are
          mandatory.
        </li>
        <li>
          The intern shall maintain confidentiality of all organizational
          information and project-related data.
        </li>
        <li>
          Any misconduct or violation of organizational policies may lead to
          immediate termination of the internship.
        </li>
        <li>
          Successful completion of the internship, including submission of all
          required reports and assignments, shall make the intern eligible for an
          Internship Completion Certificate.
        </li>
      </ol>

      <div className="mb-1 text-[13px] leading-none">
        We warmly welcome you to Vaastman Solutions Pvt. Ltd. and wish you a
        productive and enriching internship experience.
      </div>
      <div className="mb-2 text-[13px] leading-none">
        We look forward to your valuable contribution and hope this internship
        enhances your technical, professional, and interpersonal skills.
      </div>

      {/* Signature */}
      <div className="mb-4 flex items-end justify-between text-[13px] leading-none">
        <div>
          <p>With best wishes,</p>
          <p className="mt-3 font-semibold">Authorized Signatory</p>
          <p>Vaastman Solutions Pvt. Ltd.</p>
        </div>
        <div className="flex flex-col items-center">
          <QRCodeSVG
            value={`https://google.com`}
            size={64}
            level="L"
          />
          <p className="mt-1 text-[9px] uppercase tracking-widest text-black">
            Scan to join community
          </p>
        </div>
      </div>

      {/* Acceptance */}
      <div className="border-t border-black pt-4">
        <h3 className="mb-3 text-[13px] leading-none font-bold uppercase">
          Student Acceptance
        </h3>
        <p className="mb-6 text-[13px] leading-none">
          I, {data.studentName}, Registration No. {data.registrationNumber},
          hereby accept the internship offer under the terms and conditions
          mentioned above.
        </p>
        <div className="flex justify-between text-[13px] leading-none">
          <p>Student Signature: ______________________</p>
          <p>Date: ______________________</p>
        </div>
      </div>

      {/* Print-only page setup */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            @page {
              size: A4;
              margin: 2mm;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `,
        }}
      />
    </article>
  );
}

function DetailRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <tr className={last ? "" : "border-b border-black"}>
      <td className="w-1/3 px-4 py-2 font-medium">
        {label}
      </td>
      <td className="px-4 py-2">{value}</td>
    </tr>
  );
}
