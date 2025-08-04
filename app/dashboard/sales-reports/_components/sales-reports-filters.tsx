"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText } from "lucide-react";

interface SalesReportsFiltersProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  reportType: string;
  onReportTypeChange: (value: string) => void;
}

export function SalesReportsFilters({
  dateRange,
  onDateRangeChange,
  category,
  onCategoryChange,
  reportType,
  onReportTypeChange,
}: SalesReportsFiltersProps) {
  const handleExportPDF = () => {
    // Mock PDF export
    console.log("Exporting sales report as PDF...");
  };

  const handleExportExcel = () => {
    // Mock Excel export
    console.log("Exporting sales report as Excel...");
  };

  return (
    <Card className="border-green-200">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">
                Date Range
              </label>
              <Select value={dateRange} onValueChange={onDateRangeChange}>
                <SelectTrigger className="w-40 border-green-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 3 months</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">
                Category
              </label>
              <Select value={category} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-48 border-green-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fresh-produce">Fresh Produce</SelectItem>
                  <SelectItem value="dairy-eggs">Dairy & Eggs</SelectItem>
                  <SelectItem value="meat-seafood">Meat & Seafood</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                  <SelectItem value="frozen">Frozen Foods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">
                Report Type
              </label>
              <Select value={reportType} onValueChange={onReportTypeChange}>
                <SelectTrigger className="w-44 border-green-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="top-products">Top Products</SelectItem>
                  <SelectItem value="by-category">By Category</SelectItem>
                  <SelectItem value="trends">Sales Trends</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportExcel}
              className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
