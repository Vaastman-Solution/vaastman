"use client";
import { Spinner } from "@/components/ui/spinner";

interface LoaderProps {
  message?: string;
  spinnerSize?: string; // Can be any Tailwind size like "size-4", "size-8", "size-16", etc.
}

export function LoaderScreen({
  message = "Loading...",
  spinnerSize = "size-8",
}: LoaderProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner className={spinnerSize} />
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );
}
