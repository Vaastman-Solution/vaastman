import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyPayment } from "../lib/actions";

type VerifyPaymentPayload = {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

export function useVerifyPayment(candidateId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VerifyPaymentPayload) => {
      const res = await verifyPayment({
        candidateId,
        ...data,
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order", candidateId],
      });
      toast.success("Payment verified successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
