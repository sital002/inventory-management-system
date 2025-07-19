import { getOrders } from "@/actions/order";
import { SalesClient } from "./sales-client";

export async function SalesTableAsync() {
  const result = await getOrders(1, 10);
  if (!result.success) return;
  return (
    <SalesClient
      transactions={result.data.orders}
      pagination={{
        limit: result.data.limit,
        total: result.data.total,
      }}
    />
  );
}
