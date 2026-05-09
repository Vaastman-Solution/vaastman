"use client";

import {
  ImportantNotes,
  PaymentInformation,
  type PaymentReceiptData,
  PaymentSummary,
  ReceiptHeader,
  StudentDetails,
} from "./payment-receipt-sections";

type PaymentReceiptProps = {
  receipt: PaymentReceiptData;
};

export function PaymentReceipt({ receipt }: PaymentReceiptProps) {
  return (
    <article className="relative mx-auto w-full max-w-[210mm] overflow-hidden bg-white p-5 text-[12px] text-black shadow-xl sm:p-7 print:h-[297mm] print:w-[210mm] print:max-w-none print:p-6 print:shadow-none">
      <div className="pointer-events-none absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 -rotate-[30deg] whitespace-nowrap text-5xl font-black text-black/[0.03] print:text-black/[0.04]">
        PAYMENT RECEIPT
      </div>

      <div className="relative">
        <div className="mb-4 h-1.5 w-full bg-black" />

        <ReceiptHeader receipt={receipt} />

        <div className="my-5 text-center">
          <h1 className="text-xl font-bold tracking-wide">
            PAYMENT RECEIPT
          </h1>
        </div>

        <PaymentInformation receipt={receipt} />
        <StudentDetails receipt={receipt} />
        <PaymentSummary receipt={receipt} />
        <ImportantNotes />

        <footer className="mt-5 border-t-2 border-black/10 pt-3 text-center">
          <h2 className="text-base font-bold">THANK YOU FOR YOUR PAYMENT</h2>
          <p className="mt-1 text-xs text-black/70">
            We wish you a successful learning journey!
          </p>
        </footer>
      </div>
    </article>
  );
}
