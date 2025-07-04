import { getOrders } from "@/actions/order";
import { SalesClient } from "./sales-client";

export async function SalesTableAsync() {
  const salesTransactions = [
    {
      id: "TXN-2024-001",
      date: "2024-01-15",
      time: "14:30:25",
      cashier: "John Smith",
      items: [
        { name: "Organic Bananas", quantity: 2, unit: "kg", price: 4.99 },
        { name: "Whole Milk", quantity: 1, unit: "liter", price: 3.49 },
        { name: "Bread Loaf", quantity: 1, unit: "piece", price: 2.99 },
      ],
      subtotal: 11.47,
      tax: 1.15,
      total: 12.62,
      paymentMethod: "card",
      status: "completed" as const,
      customerName: "Walk-in Customer",
      receiptNumber: "R-001-2024",
    },
    {
      id: "TXN-2024-002",
      date: "2024-01-15",
      time: "15:45:12",
      cashier: "Sarah Johnson",
      items: [
        { name: "Chicken Breast", quantity: 1.5, unit: "kg", price: 12.99 },
        { name: "Mixed Vegetables", quantity: 1, unit: "kg", price: 5.49 },
      ],
      subtotal: 24.98,
      tax: 2.5,
      total: 27.48,
      paymentMethod: "cash",
      status: "completed" as const,
      customerName: "Regular Customer",
      receiptNumber: "R-002-2024",
    },
    {
      id: "TXN-2024-003",
      date: "2024-01-15",
      time: "16:20:08",
      cashier: "Mike Davis",
      items: [
        { name: "Ice Cream", quantity: 1, unit: "piece", price: 6.99 },
        { name: "Frozen Pizza", quantity: 2, unit: "piece", price: 8.99 },
      ],
      subtotal: 24.97,
      tax: 2.5,
      total: 27.47,
      paymentMethod: "mobile",
      status: "refunded" as const,
      customerName: "Walk-in Customer",
      receiptNumber: "R-003-2024",
      refundReason: "Customer changed mind",
      refundDate: "2024-01-15",
      refundTime: "16:35:22",
    },
    {
      id: "TXN-2024-004",
      date: "2024-01-14",
      time: "10:15:33",
      cashier: "Emily Wilson",
      items: [
        { name: "Shampoo", quantity: 1, unit: "piece", price: 8.99 },
        { name: "Toothpaste", quantity: 2, unit: "piece", price: 4.99 },
      ],
      subtotal: 18.97,
      tax: 1.9,
      total: 20.87,
      paymentMethod: "card",
      status: "completed" as const,
      customerName: "Regular Customer",
      receiptNumber: "R-004-2024",
    },
    {
      id: "TXN-2024-005",
      date: "2024-01-14",
      time: "11:30:45",
      cashier: "Robert Brown",
      items: [
        { name: "Cleaning Spray", quantity: 3, unit: "piece", price: 3.99 },
        { name: "Paper Towels", quantity: 2, unit: "piece", price: 5.99 },
      ],
      subtotal: 23.95,
      tax: 2.4,
      total: 26.35,
      paymentMethod: "cash",
      status: "completed" as const,
      customerName: "Walk-in Customer",
      receiptNumber: "R-005-2024",
    },
  ];
  const result = await getOrders(1, 10);
  console.log(result);
  if (!result.success) return;
  return <SalesClient transactions={result.data.orders} />;
}
