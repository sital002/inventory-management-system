"use client";

import { useState, useEffect, useCallback } from "react";
import { ActivityTable } from "./activity-table";
import { ActivitySearch } from "./activity-search";
import { ActivityPagination } from "./activity-pagination";
import { ActivityLoading } from "./activity-loading";
import { getActivity } from "@/actions/activity";
import { IActivity } from "@/models/activity";

const itemsPerPage = 10;

export function ActivityClient() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalActivities: 0,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      console.log("current page ", currentPage);
      const result = await getActivity(currentPage, itemsPerPage);
      console.log("Activity result:", result);
      if (result.data) {
        setActivities(result.data.activities);
        setPagination(result.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch activity data:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter]);

  useEffect(() => {
    console.log("page changed to", currentPage);
    fetchData();
  }, [currentPage]);

  if (loading) return <ActivityLoading />;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <ActivitySearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />

        <ActivityTable activities={activities} />

        <ActivityPagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
          totalItems={pagination.totalActivities}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
}
