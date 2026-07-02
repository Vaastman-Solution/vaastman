"use client";

import { ErrorDisplay } from "@/components/error-display";
import { LoaderScreen } from "@/components/loader-screen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAcademicSession } from "../query/use-get-academic-session";
import { columns } from "./academic-session-columns";
import { AcademicSessionTable } from "./academic-session-table";

export function AcademicSessionClient() {
  const { data, isPending, error } = useGetAcademicSession();

  if (isPending) {
    return <LoaderScreen message="Loading academic sessions..." />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={error.message}
        redirectPath="/dashboard"
        buttonText="Back to dashboard"
      />
    );
  }

  const sessions = data ?? [];
  const activeSessions = sessions.filter(
    (session) => session.isActive && !session.deprecated,
  );
  const deprecatedSessions = sessions.filter((session) => session.deprecated);

  if (!sessions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No academic sessions found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Academic sessions will appear here after they are added to a
            college.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="active" className="gap-4">
      <TabsList className="h-auto w-full justify-start rounded-2xl p-1 sm:w-fit">
        <TabsTrigger value="active">
          Active ({activeSessions.length})
        </TabsTrigger>
        <TabsTrigger value="deprecated">
          Deprecated ({deprecatedSessions.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="mt-0">
        <AcademicSessionTable columns={columns} data={activeSessions} />
      </TabsContent>
      <TabsContent value="deprecated" className="mt-0">
        <AcademicSessionTable columns={columns} data={deprecatedSessions} />
      </TabsContent>
    </Tabs>
  );
}
