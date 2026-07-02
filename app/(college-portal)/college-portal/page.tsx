import { IconSchoolFilled } from "@tabler/icons-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CollegePortalLogout } from "./_components/logout-button";

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
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
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
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-xl border bg-card p-6 text-center">
          <IconSchoolFilled className="mx-auto size-12 text-primary/30" />
          <h2 className="mt-4 text-xl font-semibold">
            Welcome to the College Portal
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Student records and more features will be available here soon.
          </p>
        </div>
      </main>
    </div>
  );
}
