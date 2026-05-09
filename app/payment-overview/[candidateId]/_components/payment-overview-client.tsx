"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { PaymentReceipt } from "@/app/payment-overview/[candidateId]/_components/payment-receipt";
import { PrintReceiptButton } from "@/app/payment-overview/[candidateId]/_components/print-receipt-button";
import { useGetPaymentReceipt } from "@/app/payment-overview/[candidateId]/query/use-get-payment-receipt";
import { ErrorDisplay } from "@/components/error-display";
import { LoaderScreen } from "@/components/loader-screen";
import { Button } from "@/components/ui/button";

type PaymentOverviewClientProps = {
  candidateId: string;
};

export function PaymentOverviewClient({
  candidateId,
}: PaymentOverviewClientProps) {
  const { data, error, isError, isPending } = useQuery(
    useGetPaymentReceipt(candidateId),
  );

  if (isPending) {
    return <LoaderScreen message="Getting payment receipt..." />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        message={error.message}
        redirectPath="/home"
        buttonText="Back to Home"
      />
    );
  }

  if (!data) {
    return <LoaderScreen message="Getting payment receipt..." />;
  }

  return (
    <main className="min-h-screen bg-white px-4 py-6 text-black print:p-0">
      <PaymentReceipt receipt={data} />

      <div className="mx-auto mt-4 flex w-full max-w-[210mm] justify-between print:hidden">
        <Button asChild variant="secondary" size="lg">
          <Link href="/home">
            <IconArrowLeft className="size-5" data-icon="inline-start" />
            Back to Home
          </Link>
        </Button>
        <PrintReceiptButton />
      </div>
    </main>
  );
}
