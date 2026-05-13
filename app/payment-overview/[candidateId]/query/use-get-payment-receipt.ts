import { queryOptions, useQuery } from "@tanstack/react-query";

import { getPaymentReceipt } from "@/app/payment-overview/[candidateId]/lib/actions";

export function useGetPaymentReceipt(candidateId: string) {
  return queryOptions({
    queryKey: ["payment-receipt", candidateId],
    queryFn: async () => {
      const res = await getPaymentReceipt(candidateId);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },
    enabled: Boolean(candidateId),
    retry: false,
  });
}
