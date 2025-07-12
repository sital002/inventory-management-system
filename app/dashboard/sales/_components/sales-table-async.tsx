import { getOrders } from "@/actions/order";
import { SalesClient } from "./sales-client";

export async function SalesTableAsync() {
  const result = await getOrders(1, 10);
  console.log(result);
  if (!result.success) return;
  return <SalesClient transactions={result.data.orders} />;
}
