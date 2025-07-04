import { SalesStats } from "./sales-stats";

export async function SalesStatsAsync() {
  const salesStats = {
    todaySales: 2450.75,
    todayTransactions: 45,
    weekSales: 15420.5,
    weekTransactions: 312,
    monthSales: 68750.25,
    monthTransactions: 1456,
    averageTransaction: 47.2,
    totalRefunds: 125.5,
    refundCount: 3,
  };

  return <SalesStats {...salesStats} />;
}
