import { IconSchoolFilled } from "@tabler/icons-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { CollegeLoginForm } from "./_components/college-login-form";

export default async function CollegeLoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    // If already logged in as COLLEGE, go to portal
    if (session.user.role === "COLLEGE") {
      redirect("/college-portal");
    }
    // If logged in as admin/staff, go to home
    redirect("/home");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md border-border/70">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <IconSchoolFilled className="size-5" />
          </div>
          <CardTitle className="text-2xl">College Portal Login</CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in with your college credentials
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <CollegeLoginForm />
          <Button variant="outline" asChild className="w-full gap-2">
            <Link href="/home">Back to Home Page</Link>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            If you cannot access your account, contact your administrator.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
