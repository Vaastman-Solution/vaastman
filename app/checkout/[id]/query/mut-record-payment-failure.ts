import { useMutation } from "@tanstack/react-query";
import { recordPaymentFailure } from "../lib/actions";

type RecordPaymentFailurePayload = {
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  reason?: string;
  paymentPayload?: Record<string, string>;
};

export function useRecordPaymentFailure() {
  return useMutation({
    mutationFn: async (data: RecordPaymentFailurePayload) => {
      const res = await recordPaymentFailure(data);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },
  });
}
