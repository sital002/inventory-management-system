"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { ActivityTable } from "./activity-table";
import { ActivitySearch, filters } from "./activity-search";
import { Pagination } from "../../../../components/pagination";
import { ActivityLoading } from "./activity-loading";
import { getActivity } from "@/actions/activity";
import { IActivity } from "@/models/activity";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const itemsPerPage = 10;

export type FilterType = {
  value:
    | "all"
    | "sale"
    | "refund"
    | "stock_in"
    | "stock_out"
    | "price_change"
    | "low_stock";
  label: string;
};

export function ActivityClient() {
  const params = useSearchParams();
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    params.get("search") || params.get("product") || ""
  );
  const [typeFilter, setTypeFilter] = useState<(typeof filters)[0]["value"]>(
    (params.get("filter") as FilterType["value"]) || "all"
  );
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalActivities: 0,
  });

  const fetchData = useCallback(
    async (page: number, search: string = searchTerm) => {
      setLoading(true);
      try {
        const result = await getActivity(
          page ? page : currentPage,
          itemsPerPage,
          {
            product: params.get("product") || "",
            search: search,
            type: typeFilter === "all" ? undefined : typeFilter,
          }
        );
        if (result.data) {
          setActivities(result.data.activities);
          setPagination(result.data.pagination);
        }
      } catch (error) {
        console.log("Failed to fetch activity data:", error);
        setActivities([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalActivities: 0,
        });
      } finally {
        setLoading(false);
      }
    },
    [typeFilter, currentPage]
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
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
        {loading ? (
          <ActivityLoading />
        ) : (
          <>
            <ActivityTable activities={activities} />

            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
              totalItems={pagination.totalActivities}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
