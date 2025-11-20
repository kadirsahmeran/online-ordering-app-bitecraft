import { supabase } from "./supabase";

// Fetch categories along with item counts
// - Returns categories with meal count
// - Also returns total, popular, and discounted item counts
export async function getCategoriesWithCounts() {
  // Get all categories
  const { data: categories, error: catError } = await supabase
    .from("category")
    .select("id, category_name");

  if (catError) throw new Error("Categories could not be loaded");

  // Count menu items per category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const { count } = await supabase
        .from("menu_items")
        .select("*", { count: "exact", head: true })
        .eq("category_id", cat.id);

      return { ...cat, meal_count: count || 0 };
    })
  );

  // Count all menu items
  const { count: allCount } = await supabase
    .from("menu_items")
    .select("*", { count: "exact", head: true });

  // Count popular menu items
  const { count: popularCount } = await supabase
    .from("menu_items")
    .select("*", { count: "exact", head: true })
    .eq("is_popular", true);

  // Count discounted menu items
  const { count: discountCount } = await supabase
    .from("menu_items")
    .select("*", { count: "exact", head: true })
    .gt("discount", 0);

  return { categoriesWithCounts, allCount, popularCount, discountCount };
}
