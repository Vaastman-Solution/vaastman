import { Suspense } from "react";
import { AuthErrorContent } from "@/components/auth-error-content";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-2xl space-y-4">
            <div className="h-32 w-full animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
