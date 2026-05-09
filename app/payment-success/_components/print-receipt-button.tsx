import { IconPrinter } from "@tabler/icons-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type PrintReceiptButtonProps = {
  candidateId?: string;
};

export function PrintReceiptButton({ candidateId }: PrintReceiptButtonProps) {
  if (!candidateId) {
    return (
      <Button disabled type="button">
        <IconPrinter className="size-5" data-icon="inline-start" />
        Print Receipt
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link href={`/payment-overview/${candidateId}`}>
        <IconPrinter className="size-5" data-icon="inline-start" />
        Print Receipt
      </Link>
    </Button>
  );
}
