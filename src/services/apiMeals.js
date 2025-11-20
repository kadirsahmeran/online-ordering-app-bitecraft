import { supabase } from "./supabase";

export async function getMenuItems() {
  const { data, error } = await supabase
    .from("meals_with_discount")
    .select(
      `
            *,
            category:category_id (
                id,
                category_name
            )
        `
    )
    .order("id", { ascending: true });
  if (error) {
    throw new Error("Menu items failed to load");
  }

  return data;
}
