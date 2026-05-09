"use client";

import { IconPrinter } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function PrintReceiptButton() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [originalTheme, setOriginalTheme] = useState<string | undefined>();

  const handlePrint = () => {
    setOriginalTheme(resolvedTheme);
    setTheme("light");
    
    // Wait a bit for theme to apply before printing
    setTimeout(() => {
      window.print();
    }, 300);
  };

  useEffect(() => {
    const afterPrint = () => {
      if (originalTheme) {
        setTheme(originalTheme);
        setOriginalTheme(undefined);
      }
    };

    window.addEventListener("afterprint", afterPrint);
    return () => window.removeEventListener("afterprint", afterPrint);
  }, [originalTheme, setTheme]);

  return (
    <Button onClick={handlePrint} size="lg" type="button">
      <IconPrinter className="size-5" data-icon="inline-start" />
      Print Receipt
    </Button>
  );
}
