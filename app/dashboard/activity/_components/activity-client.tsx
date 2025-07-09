"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { ActivityTable } from "./activity-table";
import { ActivitySearch, filters } from "./activity-search";
import { ActivityPagination } from "./activity-pagination";
import { ActivityLoading } from "./activity-loading";
import { getActivity } from "@/actions/activity";
import { IActivity } from "@/models/activity";
import { useSearchParams } from "next/navigation";

const itemsPerPage = 10;

export function ActivityClient() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] =
    useState<(typeof filters)[0]["value"]>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const params = useSearchParams();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalActivities: 0,
  });

  const fetchData = useCallback(
    async (page: number = 1, search: string = searchTerm) => {
      setLoading(true);
      try {
        const result = await getActivity(
          page ? page : currentPage,
          itemsPerPage,
          {
            search: search,
            type: typeFilter === "all" ? undefined : typeFilter,
          }
        );
        if (result.data) {
          setActivities(result.data.activities);
          setPagination(result.data.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch activity data:", error);
      } finally {
        setLoading(false);
      }
    },
    [typeFilter, currentPage]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <ActivityLoading />;

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("tes");
    fetchData(1, searchTerm);
  };
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <ActivitySearch
          handleSearch={handleSearch}
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
