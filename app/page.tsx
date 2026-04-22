"use client";

import { LoaderScreen } from "@/components/loader-screen";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Role } from "@/lib/generated/prisma/enums";

export default function Page() {
  const generateReceipt = async () => {
    const response = await fetch("/api/receipt", {
      method: "POST",
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "receipt.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={generateReceipt}>Generate Receipt</Button>;
}
