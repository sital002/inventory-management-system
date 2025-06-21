export const getStockStatus = (stockLevel: number, minStock: number) => {
  if (stockLevel === 0) return "Out of Stock";
  if (stockLevel <= minStock) return "Low Stock";
  return "In Stock";
};
export const getStatusColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800 border-green-200";
    case "Low Stock":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Out of Stock":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
