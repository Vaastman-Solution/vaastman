"use client";

import { IconPrinter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function PrintReceiptButton() {
  return (
    <Button type="button" variant="outline" onClick={() => window.print()}>
      <IconPrinter className="size-5" data-icon="inline-start" />
      Print Receipt
    </Button>
  );
}
