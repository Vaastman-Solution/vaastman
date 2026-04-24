"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createPaymentSuccessSearchParams,
  getPayButtonLabel,
  loadRazorpayScript,
} from "@/app/checkout/[id]/lib/payment-checkout";
import { ErrorDisplay } from "@/components/error-display";
import { Button } from "@/components/ui/button";
import { getOrder } from "../query/get-order";
import { useVerifyPayment } from "../query/mut-verify-payment";

export function PaymentButton({ candidateId }: { candidateId: string }) {
  const router = useRouter();
  const { data, isLoading, error } = useQuery(getOrder(candidateId));
  const verifyPaymentMutation = useVerifyPayment(candidateId);

  const isPending = isLoading || verifyPaymentMutation.isPending;
  const payableAmount = Number(data?.order.amount ?? 0);

  const handlePay = async () => {
    if (!data) {
      return;
    }

    const orderAmount = Number(data.order.amount);

    if (Number.isNaN(orderAmount) || orderAmount <= 0) {
      toast.error("Invalid order amount");
      return;
    }

    const canLoadScript = await loadRazorpayScript();
    if (!canLoadScript || !window.Razorpay) {
      toast.error("Unable to load payment gateway");
      return;
    }

    const checkout = new window.Razorpay({
      key: data.keyId,
      amount: orderAmount,
      currency: data.order.currency,
      name: "Vaastman Solution",
      description: "Course fee payment",
      order_id: data.order.id,
      notes: {
        candidateId,
      },
      prefill: {
        name: data.customer.name,
        email: data.customer.email,
        contact: data.customer.contact,
      },
      handler: async (response) => {
        try {
          const verification = await verifyPaymentMutation.mutateAsync({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          if (!verification) {
            return;
          }

          const paymentSuccessParams = createPaymentSuccessSearchParams({
            candidateId: verification.candidateId,
            orderId: verification.orderId,
            paymentId: verification.paymentId,
          });

          router.replace(`/payment-success?${paymentSuccessParams}`);
        } catch (error) {
          console.error("Server-side payment verification failed:", error);
          // Note: Error toast is handled by useMutation's onError callback.
        }
      },
      theme: {
        color: "#0f172a",
      },
    });

    checkout.on("payment.failed", () => {
      toast.error("Payment failed. Please try again.");
    });

    checkout.open();
  };

  if (error) {
    return <ErrorDisplay message={error.message} showButton={false} />;
  }

  return (
    <Button onClick={handlePay} disabled={isPending || !data}>
      {getPayButtonLabel(payableAmount, isPending)}
    </Button>
  );
}
