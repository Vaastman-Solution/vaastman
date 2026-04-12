"use client";

import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth-client";

export function SignInButton() {
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/home",
      errorCallbackURL: "/api/auth/error",
    });
  };

  return (
    <Button
      size="lg"
      disabled={loading}
      className="flex h-12 w-full items-center justify-center gap-3 text-base"
      onClick={handleSignin}
    >
      <LoadingSwap className="flex items-center gap-3" isLoading={loading}>
        <IconBrandGoogleFilled className="size-5" />
        Sign in with Google
      </LoadingSwap>
    </Button>
  );
}
