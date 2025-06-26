import { getAllSuppliers } from "@/actions/supplier";
import { ProductForm } from "./_components/product-form";
import { getAllCategories } from "@/actions/category";

export default async function page() {
  const suppliers = await getAllSuppliers();
  if (!suppliers.success) {
    return (
      <div className="min-h-screen bg-red-50 p-4 sm:p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-900">
            Error Loading Suppliers
          </h1>
          <p className="text-red-700 mt-1">
            Unable to load suppliers. Please try again later.
          </p>
        </div>
      </div>
    );
  }
  const categories = await getAllCategories();
  if (!categories.success) {
    return (
      <div className="min-h-screen bg-red-50 p-4 sm:p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-900">
            Error Loading Categories
          </h1>
          <p className="text-red-700 mt-1">
            Unable to load categories. Please try again later.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
            Add New Product
          </h1>
          <p className="text-green-700 mt-1">
            Add a new product to your supermarket inventory
          </p>
        </div>
        <ProductForm categories={categories.data} suppliers={suppliers.data} />
      </div>
    </div>
  );
}
