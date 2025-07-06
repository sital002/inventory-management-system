"use client";

import { useState } from "react";
import { SalesTable } from "./sales-table";
import { SalesSearch } from "./sales-search";
import { RefundDialog } from "./refund-dialog";
import { ExtractData } from "@/utils/response-type";
import { getOrders, refund } from "@/actions/order";

export type SalesTransaction = ExtractData<
  Awaited<ReturnType<typeof getOrders>>
>["orders"][0];
interface SalesClientProps {
  transactions: SalesTransaction[];
}

export function SalesClient({ transactions }: SalesClientProps) {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [selectedTransaction, setSelectedTransaction] =
    useState<SalesTransaction | null>(null);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (
    searchTerm: string,
    statusFilter: string,
    dateFilter: string
  ) => {
    let filtered = transactions;

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.status === statusFilter
      );
    }

    if (dateFilter !== "all") {
      const today = new Date();
      const transactionDate = new Date(filtered[0]?.createdAt || today);

      switch (dateFilter) {
        case "today":
          filtered = filtered.filter((transaction) => {
            const txnDate = new Date(transaction.createdAt);
            return txnDate.toDateString() === today.toDateString();
          });
          break;
        case "week":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter((transaction) => {
            const txnDate = new Date(transaction.createdAt);
            return txnDate >= weekAgo;
          });
          break;
        case "month":
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter((transaction) => {
            const txnDate = new Date(transaction.createdAt);
            return txnDate >= monthAgo;
          });
          break;
      }
    }

    setFilteredTransactions(filtered);
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

    const updatedTransactions = transactions.map((txn) =>
      txn._id.toString() === transactionId
        ? {
            ...txn,
            status: "refunded" as const,
            refundReason: reason,
            refundDate: new Date().toISOString().split("T")[0],
            refundTime: new Date().toLocaleTimeString(),
          }
        : txn
    );
    setFilteredTransactions(updatedTransactions);
  };

  return (
    <div className="space-y-6">
      <SalesSearch onSearch={handleSearch} />
      <SalesTable transactions={filteredTransactions} onRefund={handleRefund} />
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
