import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { auth } from "@/lib/auth";
import CollegeInfo from "./_components/collegeInfo";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin");
  }
  return (
    <ContentLayout title="College Information">
      <CollegeInfo />
    </ContentLayout>
  );
}
