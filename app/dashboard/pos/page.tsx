import { getPaginatedProducts } from "@/actions/product";
import { POSClient } from "./_components/pos-client";
import { IProduct } from "@/models/product";
import { ISupplier } from "@/models/supplier";
import { ICategory } from "@/models/category";
import { getCategories } from "@/actions/category";

const page = 1;
const limit = 10;

export type ProductResponse = IProduct & {
  supplier: ISupplier;
  category: ICategory;
};
export default async function POSPage() {
  const productResponse = await getPaginatedProducts(page, limit);
  console.log("Fetching pos page");
  const categories = await getCategories();
  if (!productResponse.success) {
    return (
      <div className="min-h-screen bg-red-50 p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-900">
            Error Loading Products
          </h1>
          <p className="text-red-700 mt-1">
            {productResponse.error || "Unable to fetch products at this time."}
          </p>
        </div>
      </div>
    );
  }
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
          initialProducts={productResponse.data.products}
          categories={categories}
        />
      </div>
    </div>
  );
}
