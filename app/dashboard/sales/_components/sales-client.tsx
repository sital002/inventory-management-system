"use client";

import { useEffect, useState } from "react";
import { SalesTable } from "./sales-table";
import { SalesSearch } from "./sales-search";
import { RefundDialog } from "./refund-dialog";
import { getOrders, refund } from "@/actions/order";
import { Pagination } from "@/components/pagination";
import { ExtractData } from "@/utils/response-type";

export type SalesTransaction = ExtractData<
  Awaited<ReturnType<typeof getOrders>>
>["orders"][0];

export function SalesClient() {
  const [transactions, setTransactions] = useState<SalesTransaction[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "completed" | "refunded" | "all"
  >("all");
  const [timeFilter, setTimeFilter] = useState<"all" | "1" | "7" | "30">("all");

  const [selectedTransaction, setSelectedTransaction] =
    useState<SalesTransaction | null>(null);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await getOrders(pagination.page, pagination.limit, {
      searchQuery: searchQuery,
      status: statusFilter,
      time: timeFilter,
    });
    if (result.success) {
      setTransactions(result.data.orders);
      setPagination((prev) => ({
        ...prev,
        total: result.data.total,
      }));
    } else {
      setError(result.error || "Failed to fetch orders");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page, searchQuery, statusFilter, timeFilter]);

  const handleSearch = (searchTerm: string, status: string, time: string) => {
    setSearchQuery(searchTerm);
    setStatusFilter(status as "completed" | "refunded" | "all");
    setTimeFilter(time as "all" | "1" | "7" | "30");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleRefund = (transaction: SalesTransaction) => {
    setSelectedTransaction(transaction);
    setIsRefundDialogOpen(true);
  };

  const processRefund = async (transactionId: string, reason: string) => {
    setIsRefundDialogOpen(false);
    setSelectedTransaction(null);
    const result = await refund(transactionId, reason);
    if (!result.success) {
      setError(result.error || "Failed to process refund");
      return;
    }
    fetchData();
  };

  return (
    <div className="space-y-6">
      <SalesSearch onSearch={handleSearch} />
      {loading ? (
        <div className="text-center text-gray-500 py-8">
          Loading transactions...
        </div>
      ) : (
        <SalesTable transactions={transactions} onRefund={handleRefund} />
      )}
      <Pagination
        currentPage={pagination.page}
        itemsPerPage={pagination.limit}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        totalItems={pagination.total}
      />
      <RefundDialog
        error={error}
        transaction={selectedTransaction}
        isOpen={isRefundDialogOpen}
        onClose={() => setIsRefundDialogOpen(false)}
        onRefund={processRefund}
      />
    </div>
  );
}
