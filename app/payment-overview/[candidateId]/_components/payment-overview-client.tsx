"use client";

import { IconArrowLeft, IconPrinter } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetOfferLetter } from "@/app/payment-overview/[candidateId]/query/use-get-offer-letter";
import { ErrorDisplay } from "@/components/error-display";
import { LoaderScreen } from "@/components/loader-screen";
import { Button } from "@/components/ui/button";
import { OfferLetter } from "./offer-letter";

type PaymentOverviewClientProps = {
  candidateId: string;
};

export function PaymentOverviewClient({
  candidateId,
}: PaymentOverviewClientProps) {
  const { data, error, isError, isPending } = useQuery(
    useGetOfferLetter(candidateId),
  );

  const { setTheme, resolvedTheme } = useTheme();
  const [originalTheme, setOriginalTheme] = useState<string | undefined>();

  const handlePrint = () => {
    setOriginalTheme(resolvedTheme);
    setTheme("light");

    setTimeout(() => {
      window.print();
    }, 300);
  };

  useEffect(() => {
    const afterPrint = () => {
      if (originalTheme) {
        setTheme(originalTheme);
        setOriginalTheme(undefined);
      }
    };

    window.addEventListener("afterprint", afterPrint);
    return () => window.removeEventListener("afterprint", afterPrint);
  }, [originalTheme, setTheme]);

  if (isPending) {
    return <LoaderScreen message="Loading offer letter..." />;
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
    return <LoaderScreen message="Loading offer letter..." />;
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 print:bg-white print:p-0">
      <OfferLetter data={data} />

      <div className="mx-auto mt-4 flex w-full max-w-3xl justify-between print:hidden">
        <Button asChild variant="secondary" size="lg">
          <Link href="/home">
            <IconArrowLeft className="size-5" data-icon="inline-start" />
            Back to Home
          </Link>
        </Button>
        <Button onClick={handlePrint} size="lg" type="button">
          <IconPrinter className="size-5" data-icon="inline-start" />
          Print / Save as PDF
        </Button>
      </div>
    </main>
  );
}
