export const categories = [
  {
    id: 1,
    name: "Fresh Produce",
    description: "Fruits, vegetables, and fresh herbs",
    itemCount: 145,
    lowStockItems: 12,
    totalValue: 15420.5,
    color: "bg-green-50 border-green-200",
  },
  {
    id: 2,
    name: "Dairy & Eggs",
    description: "Milk, cheese, yogurt, and fresh eggs",
    itemCount: 89,
    lowStockItems: 5,
    totalValue: 8750.25,
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: 3,
    name: "Meat & Seafood",
    description: "Fresh and frozen meat, poultry, and seafood",
    itemCount: 67,
    lowStockItems: 8,
    totalValue: 12340.75,
    color: "bg-red-50 border-red-200",
  },
  {
    id: 4,
    name: "Bakery",
    description: "Fresh bread, pastries, and baked goods",
    itemCount: 45,
    lowStockItems: 3,
    totalValue: 3250.0,
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: 5,
    name: "Frozen Foods",
    description: "Frozen meals, ice cream, and frozen vegetables",
    itemCount: 123,
    lowStockItems: 15,
    totalValue: 9875.3,
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    id: 6,
    name: "Beverages",
    description: "Soft drinks, juices, water, and alcoholic beverages",
    itemCount: 156,
    lowStockItems: 7,
    totalValue: 11200.45,
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: 7,
    name: "Snacks & Candy",
    description: "Chips, cookies, candy, and confectionery",
    itemCount: 98,
    lowStockItems: 4,
    totalValue: 4560.8,
    color: "bg-orange-50 border-orange-200",
  },
  {
    id: 8,
    name: "Health & Beauty",
    description: "Personal care, cosmetics, and health products",
    itemCount: 134,
    lowStockItems: 9,
    totalValue: 7890.6,
    color: "bg-pink-50 border-pink-200",
  },
  {
    id: 9,
    name: "Household Items",
    description: "Cleaning supplies, paper products, and home essentials",
    itemCount: 87,
    lowStockItems: 6,
    totalValue: 5670.25,
    color: "bg-gray-50 border-gray-200",
  },
];

// Customer orders data
export const customerOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    items: [
      { name: "Organic Bananas", quantity: 3, price: 4.99 },
      { name: "Whole Milk", quantity: 1, price: 3.49 },
      { name: "Bread Loaf", quantity: 2, price: 2.99 },
    ],
    totalAmount: 14.46,
    status: "completed",
    paymentMethod: "credit-card",
    orderType: "pickup",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-15",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    items: [
      { name: "Chicken Breast", quantity: 2, price: 12.99 },
      { name: "Mixed Vegetables", quantity: 1, price: 5.49 },
    ],
    totalAmount: 18.48,
    status: "preparing",
    paymentMethod: "debit-card",
    orderType: "delivery",
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-14",
    customerName: "Mike Davis",
    customerEmail: "mike.davis@email.com",
    items: [
      { name: "Ice Cream", quantity: 1, price: 6.99 },
      { name: "Frozen Pizza", quantity: 2, price: 8.99 },
      { name: "Orange Juice", quantity: 1, price: 4.49 },
    ],
    totalAmount: 20.47,
    status: "ready",
    paymentMethod: "cash",
    orderType: "pickup",
  },
  {
    id: "ORD-2024-004",
    date: "2024-01-14",
    customerName: "Emily Wilson",
    customerEmail: "emily.w@email.com",
    items: [
      { name: "Shampoo", quantity: 1, price: 8.99 },
      { name: "Toothpaste", quantity: 2, price: 4.99 },
    ],
    totalAmount: 13.98,
    status: "cancelled",
    paymentMethod: "credit-card",
    orderType: "delivery",
  },
  {
    id: "ORD-2024-005",
    date: "2024-01-13",
    customerName: "Robert Brown",
    customerEmail: "rob.brown@email.com",
    items: [
      { name: "Cleaning Spray", quantity: 3, price: 3.99 },
      { name: "Paper Towels", quantity: 2, price: 5.99 },
    ],
    totalAmount: 15.97,
    status: "completed",
    paymentMethod: "debit-card",
    orderType: "pickup",
  },
];

export const purchaseOrders = [
  {
    id: "PO-2024-001",
    date: "2024-01-15",
    supplier: "Fresh Farm Suppliers",
    items: 25,
    totalCost: 2450.75,
    status: "in-stock",
    expectedDate: "2024-01-15",
    category: "Fresh Produce",
  },
  {
    id: "PO-2024-002",
    date: "2024-01-14",
    supplier: "Dairy Direct Co.",
    items: 15,
    totalCost: 1890.5,
    status: "low-stock",
    expectedDate: "2024-01-18",
    category: "Dairy & Eggs",
  },
  {
    id: "PO-2024-003",
    date: "2024-01-13",
    supplier: "Premium Meats Ltd",
    items: 12,
    totalCost: 3250.0,
    status: "out-of-stock",
    expectedDate: "2024-01-16",
    category: "Meat & Seafood",
  },
  {
    id: "PO-2024-004",
    date: "2024-01-12",
    supplier: "Beverage Distributors",
    items: 45,
    totalCost: 1750.25,
    status: "in-stock",
    expectedDate: "2024-01-12",
    category: "Beverages",
  },
  {
    id: "PO-2024-005",
    date: "2024-01-11",
    supplier: "Frozen Foods Express",
    items: 30,
    totalCost: 2100.8,
    status: "reorder-needed",
    expectedDate: "2024-01-19",
    category: "Frozen Foods",
  },
  {
    id: "PO-2024-006",
    date: "2024-01-10",
    supplier: "Bakery Fresh Supply",
    items: 8,
    totalCost: 450.0,
    status: "overstocked",
    expectedDate: "2024-01-13",
    category: "Bakery",
  },
];

export const inventoryStats = {
  totalCategories: categories.length,
  totalItems: categories.reduce((sum, cat) => sum + cat.itemCount, 0),
  lowStockItems: categories.reduce((sum, cat) => sum + cat.lowStockItems, 0),
  totalValue: categories.reduce((sum, cat) => sum + cat.totalValue, 0),
};

export const orderStats = {
  totalOrders: purchaseOrders.length,
  inStock: purchaseOrders.filter((o) => o.status === "in-stock").length,
  lowStock: purchaseOrders.filter((o) => o.status === "low-stock").length,
  outOfStock: purchaseOrders.filter((o) => o.status === "out-of-stock").length,
  reorderNeeded: purchaseOrders.filter((o) => o.status === "reorder-needed")
    .length,
  overstocked: purchaseOrders.filter((o) => o.status === "overstocked").length,
};

export const customerOrderStats = {
  totalOrders: customerOrders.length,
  completed: customerOrders.filter((o) => o.status === "completed").length,
  preparing: customerOrders.filter((o) => o.status === "preparing").length,
  ready: customerOrders.filter((o) => o.status === "ready").length,
  cancelled: customerOrders.filter((o) => o.status === "cancelled").length,
  totalRevenue: customerOrders
    .filter((o) => o.status === "completed")
    .reduce((sum, order) => sum + order.totalAmount, 0),
};

// Async functions to simulate data fetching
export async function getCategoryStats() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return inventoryStats;
}

export async function getCategories() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return categories;
}
