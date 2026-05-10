import type { DashboardOverviewData } from "@/app/(dashboard)/lib/dashboard-overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewStats({
  overview,
}: {
  overview: DashboardOverviewData | undefined;
}) {
  const isDateFiltered = Boolean(overview?.range.isFiltered);
  const collegesCaption = isDateFiltered
    ? "in selected date range"
    : "all-time";

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Colleges</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">
            {overview?.metrics.colleges ?? 0}
          </p>
          <p className="text-sm text-muted-foreground">{collegesCaption}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Students</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">
            {overview?.metrics.students ?? 0}
          </p>
          <p className="text-sm text-muted-foreground">all-time</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">
            {overview?.metrics.registrations ?? 0}
          </p>
          <p className="text-sm text-muted-foreground">all-time</p>
        </CardContent>
      </Card>
    </div>
  );
}
