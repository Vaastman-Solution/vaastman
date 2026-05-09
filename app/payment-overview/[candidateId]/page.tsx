import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { PaymentOverviewClient } from "@/app/payment-overview/[candidateId]/_components/payment-overview-client";
import { useGetPaymentReceipt } from "@/app/payment-overview/[candidateId]/query/use-get-payment-receipt";
import { getQueryClient } from "@/lib/get-query-client";

type PaymentOverviewPageProps = {
  params: Promise<{
    candidateId: string;
  }>;
};

export default async function Page({ params }: PaymentOverviewPageProps) {
  const { candidateId } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(useGetPaymentReceipt(candidateId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentOverviewClient candidateId={candidateId} />
    </HydrationBoundary>
  );
}
