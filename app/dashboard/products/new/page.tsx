import { AddProductForm } from "./_components/add-new-product";

export default function NewProductPage() {
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
        <AddProductForm />
      </div>
    </div>
  );
}
