import { IconCheckupList, IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import { PrintReceiptButton } from "@/app/payment-success/_components/print-receipt-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PaymentSuccessPageProps = {
  searchParams: Promise<{
    candidateId?: string;
    orderId?: string;
    paymentId?: string;
  }>;
};

function formatValue(value?: string) {
  if (!value) {
    return "Not available";
  }

  return value;
}

export default async function Page({ searchParams }: PaymentSuccessPageProps) {
  const { candidateId, orderId, paymentId } = await searchParams;

  return (
    <main className="container mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl items-center py-10">
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3 text-emerald-600">
            <IconCircleCheckFilled className="size-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em]">
              Payment Successful
            </span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl">
              Your payment is confirmed.
            </CardTitle>
            <CardDescription>
              Download your payment receipt with the confirmed details.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-2xl border bg-muted/30 p-4">
            <div className="mb-3 flex items-center gap-2 font-medium">
              <IconCheckupList className="size-5" />
              Payment details
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-muted-foreground">Candidate ID</dt>
                <dd className="font-medium">{formatValue(candidateId)}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-muted-foreground">Order ID</dt>
                <dd className="font-medium">{formatValue(orderId)}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-muted-foreground">Payment ID</dt>
                <dd className="font-medium">{formatValue(paymentId)}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t sm:flex-row sm:justify-between">
          <Button variant={"outline"} asChild>
            <Link href="/home">Back to Home</Link>
          </Button>
          <PrintReceiptButton candidateId={candidateId} />
        </CardFooter>
      </Card>
    </main>
  );
}
