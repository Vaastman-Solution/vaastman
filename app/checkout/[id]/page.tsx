import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getQueryClient } from "@/lib/get-query-client";
import { PaymentButton } from "./_components/payment-button";
import { getOrder } from "./query/get-order";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: candidateId } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getOrder(candidateId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container mx-auto max-w-2xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>Payment Checkout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="font-medium">Payment summary</p>
              <p className="text-sm text-muted-foreground">
                Your payable amount is shown on the payment button below.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              By clicking the payment button, you agree to our{" "}
              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Terms and Conditions
              </Link>
              .
            </p>
          </CardContent>
          <CardFooter className="border-t">
            <PaymentButton candidateId={candidateId} />
          </CardFooter>
        </Card>
      </main>
    </HydrationBoundary>
  );
}
