import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { auth } from "@/lib/auth";
import { AcademicSessionClient } from "./_components/academic-session-client";

export default async function AcademicSessionPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin");
  }

  return (
    <ContentLayout title="Academic Sessions">
      <AcademicSessionClient />
    </ContentLayout>
  );
}
