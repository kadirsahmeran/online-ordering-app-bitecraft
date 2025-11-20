/**
 * Component: OrderSummary
 * Description:
 *  - Displays the order summary section inside the checkout page.
 *  - Shows a breakdown of cart items, original price, discounts, and final price.
 *  - Retrieves all pricing details from the CartContext and passes them to OrderPriceDetails.
 *
 */

import { useCart } from "../../context/CartContext";
import OrderContainer from "../../ui/OrderContainer";
import OrderPriceDetails from "../../ui/OrderPriceDetails";

export default function OrderSummary() {
  // Retrieve all cart-related details from context
  const {
    cartItems,
    totalOriginalPrice,
    totalDiscount,
    hasDiscount,
    totalFinalPrice,
    totalItems,
  } = useCart();

  // Prepare order data object to pass into child component
  const orderDetails = {
    orders: cartItems,
    totalOriginalPrice,
    totalDiscount,
    hasDiscount,
    totalFinalPrice,
    totalItems,
  };

  return (
    // Wrapper container for the order summary section
    <OrderContainer className="lg:w-[35%] w-full">
      {/* Section Title */}
      <h5 className="text-xl sm:text-2xl font-medium text-gold pb-5">
        Your Cart
      </h5>

      {/* Detailed price breakdown (subtotal, discount, final total) */}
      <div>
        <OrderPriceDetails {...orderDetails} />
      </div>
    </OrderContainer>
  );
}
