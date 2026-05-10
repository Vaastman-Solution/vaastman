"use client";

import { useState } from "react";
import { ErrorDisplay } from "@/components/error-display";
import { LoaderScreen } from "@/components/loader-screen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetCollegeInfo } from "../query/use-get-college-info";
import { useGetDashboardOverview } from "../query/use-get-dashboard-overview";
import { CollegeListSection } from "./college-list-section";
import { OverviewFilter } from "./overview-filter";
import { OverviewStats } from "./overview-stats";

export default function CollegeInfo() {
  const [fromDateDraft, setFromDateDraft] = useState("");
  const [toDateDraft, setToDateDraft] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { data, isPending, error } = useGetCollegeInfo();
  const {
    data: overview,
    isPending: isOverviewPending,
    error: overviewError,
  } = useGetDashboardOverview({
    from: fromDate || undefined,
    to: toDate || undefined,
  });

  const isDateFiltered = Boolean(fromDate || toDate);

  if (isPending || isOverviewPending) {
    return (
      <LoaderScreen
        message="Loading overview..."
        offsetHeight={NAVBAR_HEIGHT * 2}
      />
    );
  }

  if (error || overviewError) {
    return (
      <ErrorDisplay
        message={error?.message ?? overviewError?.message}
        showButton={false}
        refreshButton={true}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <OverviewFilter
            appliedFromDate={fromDate}
            appliedToDate={toDate}
            fromDateDraft={fromDateDraft}
            isDateFiltered={isDateFiltered}
            onApply={() => {
              setFromDate(fromDateDraft);
              setToDate(toDateDraft);
            }}
            onClear={() => {
              setFromDateDraft("");
              setToDateDraft("");
              setFromDate("");
              setToDate("");
            }}
            onFromDateChange={setFromDateDraft}
            onToDateChange={setToDateDraft}
            toDateDraft={toDateDraft}
          />
        </CardContent>
      </Card>

      <OverviewStats overview={overview} />

      <div>
        <h2 className="mb-3 text-lg font-semibold">Colleges</h2>
        <CollegeListSection colleges={data ?? []} />
      </div>
    </div>
  );
}
