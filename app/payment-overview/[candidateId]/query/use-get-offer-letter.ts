import { queryOptions } from "@tanstack/react-query";

import { getOfferLetterData } from "@/app/payment-overview/[candidateId]/lib/actions";

export function useGetOfferLetter(candidateId: string) {
  return queryOptions({
    queryKey: ["offer-letter", candidateId],
    queryFn: async () => {
      const res = await getOfferLetterData(candidateId);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },
    enabled: Boolean(candidateId),
    retry: false,
  });
}
