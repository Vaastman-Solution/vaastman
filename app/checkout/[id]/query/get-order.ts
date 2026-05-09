import { queryOptions } from "@tanstack/react-query";
import { getPaymentOrder } from "@/app/checkout/[id]/lib/actions";

export function getOrder(candidateId: string) {
  return queryOptions({
    queryKey: ["order", candidateId],
    queryFn: async () => {
      const res = await getPaymentOrder(candidateId);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
