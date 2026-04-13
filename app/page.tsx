"use client";

import { LoaderScreen } from "@/components/loader-screen";
import { authClient } from "@/lib/auth-client";

import { Role } from "@/lib/generated/prisma/enums";

export default function Page() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <LoaderScreen message="Authenticating..." />;
  }

  if (!session) {
    window.location.href = "/signin";
  }

  if (session?.user.role !== Role.ADMIN) {
    window.location.href = "/signin";
  }

  return <div>hi there</div>;
}
