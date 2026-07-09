import { IconSchoolFilled } from "@tabler/icons-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CollegePortalLogout } from "./_components/logout-button";
import { StudentListing } from "./_components/student-listing";

export default async function CollegePortalPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user.collegeId) {
    redirect("/college-login");
  }

  const college = await prisma.college.findUnique({
    where: { id: session.user.collegeId },
    include: { university: true },
  });

  if (!college) {
    redirect("/college-login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <IconSchoolFilled className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{college.name}</h1>
              <p className="text-xs text-muted-foreground">
                {college.university.name.replace(/_/g, " ")}
              </p>
            </div>
          </div>
          <CollegePortalLogout />
        </div>
      </header>

      {/* Main content */}
      <main className="px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Registered Students</h2>
          <p className="text-sm text-muted-foreground">
            View and export students registered under your college.
          </p>
        </div>
        <StudentListing />
      </main>
    </div>
  );
}
