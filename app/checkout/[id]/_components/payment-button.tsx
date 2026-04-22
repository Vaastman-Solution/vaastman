"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ErrorDisplay } from "@/components/error-display";
import { Button } from "@/components/ui/button";
import { getOrder } from "../query/get-order";
import { useVerifyPayment } from "../query/mut-verify-payment";

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
  notes?: Record<string, string>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", cb: () => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

let razorpayScriptPromise: Promise<boolean> | null = null;

function loadRazorpayScript() {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      razorpayScriptPromise = null;
      resolve(false);
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

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

          const paymentSuccessParams = new URLSearchParams({
            candidateId: verification.candidateId,
            orderId: verification.orderId,
            paymentId: verification.paymentId,
          });

          router.replace(`/payment-success?${paymentSuccessParams.toString()}`);
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
      {isPending ? "Loading..." : `Pay ₹${(payableAmount / 100).toFixed(2)}`}
    </Button>
  );
}
