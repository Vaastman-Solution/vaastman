"use client";

import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth-client";

export function CollegePortalLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await authClient.signOut();
    router.push("/college-login");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={loading}
      onClick={handleLogout}
      className="gap-2"
    >
      <LoadingSwap isLoading={loading} className="flex items-center gap-2">
        <IconLogout className="size-5" />
        Sign Out
      </LoadingSwap>
    </Button>
  );
}
