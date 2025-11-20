import { useCart } from "../context/CartContext";
import EmptyCartOrder from "../ui/EmptyCartOrder";
import OrderForm from "../features/order/OrderForm";
import OrderSummary from "../features/order/OrderSummary";
import useTitle from "../hooks/useTitle";
import SectionTitle from "../ui/SectionTitle";

// Order page component
// - Shows the order form and summary if cart has items
// - Shows empty cart message if cart is empty
export default function Order() {
  // Set page title
  useTitle("Bitecraft | Order");

  const { cartItems } = useCart();

  return (
    <section className="py-12 md:py-20 customContainer">
      {cartItems.length === 0 ? (
        // Display message when cart is empty
        <EmptyCartOrder />
      ) : (
        <>
          {/* Page heading */}
          <SectionTitle>Complete Your Order</SectionTitle>

          {/* Layout: left = delivery form, right = order summary */}
          <div className="flex lg:flex-row flex-col gap-8 items-start">
            <OrderForm />
            <OrderSummary />
          </div>
        </>
      )}
    </section>
  );
}
