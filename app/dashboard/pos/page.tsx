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
  const categories = await getCategories();
  let products: ProductResponse[] = [];
  if (productResponse.success) {
    products = productResponse.data.products;
  }
  console.log(products, "test");
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

        <POSClient initialProducts={products} categories={categories} />
      </div>
    </div>
  );
}
