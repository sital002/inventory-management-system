"use client";

import { useState } from "react";
import { SalesReportsStats } from "./sales-reports-stats";
import { SalesReportsFilters } from "./sales-reports-filters";
import { SalesReportsCharts } from "./sales-reports-charts";
import { SalesReportsTable } from "./sales-reports-table";

export function SalesReportsClient() {
  const [dateRange, setDateRange] = useState("30");
  const [category, setCategory] = useState("all");
  const [reportType, setReportType] = useState("overview");

  return (
    <div className="space-y-6">
      <SalesReportsFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        category={category}
        onCategoryChange={setCategory}
        reportType={reportType}
        onReportTypeChange={setReportType}
      />

      <SalesReportsStats dateRange={dateRange} category={category} />

      <SalesReportsCharts
        dateRange={dateRange}
        category={category}
        reportType={reportType}
      />

      <SalesReportsTable />
    </div>
  );
}
