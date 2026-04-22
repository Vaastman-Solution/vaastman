"use client";

import { IconPrinter } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type PrintReceiptButtonProps = {
  candidateId?: string;
};

function getFileNameFromDisposition(contentDisposition: string | null) {
  if (!contentDisposition) {
    return "receipt.pdf";
  }

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  const asciiMatch = contentDisposition.match(/filename="([^"]+)"/i);
  if (asciiMatch?.[1]) {
    return asciiMatch[1];
  }

  return "receipt.pdf";
}

export function PrintReceiptButton({ candidateId }: PrintReceiptButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const generateReceipt = async () => {
    if (!candidateId) {
      toast.error("Candidate ID is missing");
      return;
    }

    setIsDownloading(true);

    try {
      const response = await fetch("/api/receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ candidateId }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error ?? "Failed to download receipt");
      }

      const blob = await response.blob();
      const fileName = getFileNameFromDisposition(
        response.headers.get("Content-Disposition"),
      );
      const url = URL.createObjectURL(blob);
      const openedWindow = window.open(url, "_blank", "noopener,noreferrer");

      if (!openedWindow) {
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
      }

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60_000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to download receipt";
      toast.error(message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={generateReceipt}
      disabled={isDownloading || !candidateId}
    >
      <IconPrinter className="size-5" data-icon="inline-start" />
      {isDownloading ? "Downloading..." : "Print Receipt"}
    </Button>
  );
}
