import { CategoryClient } from "./category-client"
import { getCategories } from "@/lib/data"

export async function CategoryListAsync() {
  const categories = await getCategories()

  return <CategoryClient categories={categories} />
}
