import { getAllCategories } from "@/actions/category";
import { CategoryClient } from "./category-client";

export async function CategoryListAsync() {
  const result = await getAllCategories();
  if (!result.success) {
    console.error("Failed to fetch categories:", result.error);
    return <div>Error loading categories</div>;
  }
  return <CategoryClient categories={result.data} />;
}
