import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { RegisteredStudents } from "./_components/registered-students";

type RegisteredStudentsPageProps = {
  params: Promise<{ collegeId: string }>;
};

export default async function RegisteredStudentsPage({
  params,
}: RegisteredStudentsPageProps) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin");
  }

  const { collegeId } = await params;

  return <RegisteredStudents collegeId={collegeId} />;
}
