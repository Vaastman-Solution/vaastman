"use client";

import { IconEyeFilled } from "@tabler/icons-react";
import Link from "next/link";
import { ErrorDisplay } from "@/components/error-display";
import { LoaderScreen } from "@/components/loader-screen";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetCollegeInfo } from "../query/use-get-college-info";

export default function CollegeInfo() {
  const { data, isPending, error } = useGetCollegeInfo();

  if (isPending) {
    return <LoaderScreen message="Getting colleges list..." />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={error.message}
        redirectPath="/signin"
        buttonText="Back to Signin Page"
      />
    );
  }

  if (!data?.length) {
    return (
      <div className="container mx-auto px-4 py-10 md:px-6">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No colleges found</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Add college information to see details here.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 md:px-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.map((college) => (
          <Card key={college.id} className="h-full justify-between">
            <CardHeader>
              <CardTitle className="line-clamp-2">
                {college.name} {college.code ? `[${college.code}]` : ""}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Session & associated fee
                </p>
                {college.sessions.length ? (
                  <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm">
                    <p className="font-medium text-muted-foreground">Session</p>
                    <p className="text-right font-medium text-muted-foreground">
                      Fee
                    </p>
                    {college.sessions.map((session) => (
                      <div key={session.id} className="contents">
                        <p>{session.name}</p>
                        <p className="text-right">{session.fees}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm">-</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="border-t">
              <Button
                variant="link"
                className="px-0 text-muted-foreground"
                asChild
              >
                <Link href={`/dashboard/registered-students/${college.id}`}>
                  <IconEyeFilled className="size-5" />
                  View registered students
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
