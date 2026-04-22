"use client";

import { IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import { DataTable } from "@/app/college/_components/data-table";
import { downloadRegisteredStudentsSessionCsv } from "@/app/dashboard/registered-students/[collegeId]/lib/export-session-csv";
import { useGetRegisteredStudents } from "@/app/dashboard/registered-students/[collegeId]/query/use-get-registered-students";
import { ErrorDisplay } from "@/components/error-display";
import { LoaderScreen } from "@/components/loader-screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "./column";

type RegisteredStudentsProps = {
  collegeId: string;
};

export function RegisteredStudents({ collegeId }: RegisteredStudentsProps) {
  const { data, isPending, error } = useGetRegisteredStudents(collegeId);

  if (isPending) {
    return <LoaderScreen message="Getting registered students..." />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={error.message}
        redirectPath="/dashboard"
        buttonText="Back to Dashboard"
      />
    );
  }

  if (!data?.sessions.length) {
    return (
      <div className="container mx-auto space-y-4 px-4 py-10 md:px-6">
        <Button variant="link" className="px-0 text-muted-foreground" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No sessions found</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            This college has no configured sessions yet.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-4 px-4 py-10 md:px-6">
      <Button variant="link" className="px-0 text-muted-foreground" asChild>
        <Link href="/dashboard">Back to Dashboard</Link>
      </Button>

      <div>
        <h3 className="font-semibold">
          {data.college.name}{" "}
          {data.college.code ? `[${data.college.code}]` : ""}
        </h3>
        <p className="text-sm text-muted-foreground">Registered students</p>
      </div>

      <Tabs defaultValue={data.sessions[0].name} className="gap-4">
        <TabsList className="h-auto w-full flex-wrap justify-start rounded-2xl p-1">
          {data.sessions.map((session) => (
            <TabsTrigger
              key={session.name}
              value={session.name}
              className="px-3"
            >
              {session.name} ({session.candidates.length})
            </TabsTrigger>
          ))}
        </TabsList>

        {data.sessions.map((session) => (
          <TabsContent key={session.name} value={session.name} className="mt-0">
            <div className="mb-3 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  downloadRegisteredStudentsSessionCsv({
                    collegeName: data.college.name,
                    sessionName: session.name,
                    candidates: session.candidates,
                  })
                }
                disabled={!session.candidates.length}
              >
                <IconDownload className="size-5" data-icon="inline-start" />
                Export CSV
              </Button>
            </div>
            <DataTable columns={columns} data={session.candidates} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
