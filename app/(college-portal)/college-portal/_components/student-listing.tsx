"use client";

import { IconDownload, IconSchoolFilled } from "@tabler/icons-react";
import { useGetCollegeStudents } from "@/app/(college-portal)/college-portal/query/use-get-college-students";
import { ErrorDisplay } from "@/components/error-display";
import { LoaderScreen } from "@/components/loader-screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { downloadCollegeStudentsCsv } from "../lib/export-csv";
import { CollegeDataTable } from "./college-data-table";
import { columns } from "./columns";

const filterableColumns = [
  { columnId: "mjcSubject", title: "MJC Subject" },
  { columnId: "domainOrMainSubject", title: "Domain" },
  { columnId: "gender", title: "Gender" },
];

export function StudentListing() {
  const { data, isPending, error } = useGetCollegeStudents();

  if (isPending) {
    return <LoaderScreen message="Loading students..." />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={error.message}
        redirectPath="/college-portal"
        buttonText="Retry"
        refreshButton
      />
    );
  }

  if (!data?.sessions.length) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconSchoolFilled className="size-5 text-primary/40" />
            No Students Found
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          There are no registered students in your college yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue={data.sessions[0].id} className="gap-4">
      <TabsList className="h-auto w-full flex-wrap justify-start rounded-2xl p-1">
        {data.sessions.map((session) => (
          <TabsTrigger key={session.id} value={session.id} className="px-3">
            {session.name} ({session.students.length})
          </TabsTrigger>
        ))}
      </TabsList>

      {data.sessions.map((session) => (
        <TabsContent key={session.id} value={session.id} className="mt-0">
          <div className="mb-3 flex justify-end">
            <Button
              type="button"
              onClick={() =>
                downloadCollegeStudentsCsv({
                  collegeName: data.college.name,
                  sessionName: session.name,
                  students: session.students,
                })
              }
              disabled={!session.students.length}
            >
              <IconDownload className="size-5" data-icon="inline-start" />
              Export CSV
            </Button>
          </div>
          <CollegeDataTable
            columns={columns}
            data={session.students}
            filterableColumns={filterableColumns}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
