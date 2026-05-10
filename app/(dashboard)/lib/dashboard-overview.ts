export type DashboardOverviewInput = {
  from?: string;
  to?: string;
};

export type DashboardOverviewData = {
  range: {
    from: string | null;
    to: string | null;
    isFiltered: boolean;
  };
  metrics: {
    colleges: number;
    students: number;
    registrations: number;
  };
};

type DateRangeResult = {
  fromDate?: Date;
  toDate?: Date;
  from?: string;
  to?: string;
  error?: string;
};

function parseDateInput(value?: string) {
  if (!value) {
    return null;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function endOfDayUtc(date: Date) {
  const end = new Date(date);
  end.setUTCHours(23, 59, 59, 999);
  return end;
}

export function resolveOverviewDateRange(
  input: DashboardOverviewInput,
): DateRangeResult {
  const from = input.from?.trim();
  const to = input.to?.trim();

  const fromDate = parseDateInput(from);
  if (from && !fromDate) {
    return { error: "Invalid from date. Use YYYY-MM-DD format." };
  }

  const toDate = parseDateInput(to);
  if (to && !toDate) {
    return { error: "Invalid to date. Use YYYY-MM-DD format." };
  }

  if (fromDate && toDate && fromDate > toDate) {
    return { error: "From date cannot be after to date." };
  }

  return {
    fromDate: fromDate ?? undefined,
    toDate: toDate ? endOfDayUtc(toDate) : undefined,
    from: from ?? undefined,
    to: to ?? undefined,
  };
}
