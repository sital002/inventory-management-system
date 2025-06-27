import { POSClient } from "./_components/pos-client";
import { inventoryItems, categories, suppliers } from "@/lib/data";

export default async function POSPage() {
  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
            Point of Sale
          </h1>
          <p className="text-green-700 mt-1">
            Process customer sales and manage transactions
          </p>
        </div>

        <POSClient
          products={inventoryItems}
          categories={categories}
          suppliers={suppliers}
        />
      </div>
    </div>
  );
}
