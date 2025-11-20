import { generateConfirmationToken } from "../utils/helpers";
import { supabase } from "./supabase";

/**
 * Creates a new food order in the database
 * Generates a unique confirmation token
 */
export async function createOrder(formData) {
  const {
    firstName,
    lastName,
    phone,
    address,
    message,
    orders,
    totalFinalPrice,
    totalOriginalPrice,
    hasDiscount,
    totalDiscount,
    totalItems,
  } = formData;

  const confirmation_token = generateConfirmationToken();

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        message: message,
        orders,
        total_final_price: totalFinalPrice,
        total_original_price: totalOriginalPrice,
        has_discount: hasDiscount,
        total_discount: totalDiscount,
        total_items: totalItems,
        confirmation_token,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error("Food order could not be placed");
  }

  return data;
}
/**
 * Retrieves an order by ID and confirmation token
 * Throws an error if order not found or token invalid
 */
export async function getOrderByIdAndToken({ orderId, token }) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .eq("confirmation_token", token)
    .single();

  if (error || !data) {
    throw new Error("Order not found or invalid token");
  }

  return data;
}
