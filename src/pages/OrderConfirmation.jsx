/**
 * Page: OrderConfirmation
 * Description:
 *  - Displays the confirmation page after an order is successfully completed.
 *
 * Route Example:
 *  /order/confirmation/:orderId?token=XYZ
 *
 */

import { useParams, useSearchParams } from "react-router";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Button from "../ui/Button";
import OrderInvoince from "../features/order/OrderInvoince";
import { CheckCircle } from "lucide-react";
import useOrderConfirmation from "../features/order/useOrderConfirmation";
import Spinner from "../ui/Spinner";
import useTitle from "../hooks/useTitle";
import SectionTitle from "../ui/SectionTitle";

export default function OrderConfirmation() {
  // Set document title for this page
  useTitle("Bitecraft | Order Confirmed");

  // Get the dynamic orderId from URL
  const { orderId } = useParams();

  // Get "token" from search params (used for verification)
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { dispatch } = useCart();

  // Fetch order confirmation details (from Supabase or API)
  const {
    data: orderData,
    isPending,
    error,
  } = useOrderConfirmation(orderId, token);

  /**
   * Clear the cart once the user reaches the confirmation page.
   * This ensures the cart resets after a successful order.
   */
  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
  }, [dispatch]);

  // Loading state → show spinner
  if (isPending) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  // Error or missing data → show fallback message
  if (error || !orderData) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-600 mb-6">
          Order information not found.
        </p>
        <Button to="/menu" rounded="full">
          Return to menu
        </Button>
      </div>
    );
  }

  // Success UI
  return (
    <section className="py-12 md:py-20 customContainer">
      {/* Success message + icon */}
      <div className="text-center mb-14">
        {/* Glowing golden circle background */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gold rounded-full blur-lg opacity-70"></div>

          {/* Foreground golden circle with check icon */}
          <div className="relative w-24 h-24 bg-gold rounded-full flex items-center justify-center shadow-xl">
            <CheckCircle className="w-14 h-14 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <SectionTitle>Your Order is Complete!</SectionTitle>

        <p className="text-gray-600 max-w-xl mx-auto text-base md:text-lg">
          Thank you for your purchase. Your order has been successfully
          received.
        </p>
      </div>

      {/* Order invoice summary component */}
      <OrderInvoince orderData={orderData} />

      {/* Continue shopping button */}
      <div className="text-center mt-12">
        <Button to="/menu" rounded="full" size="xl">
          Continue Shopping
        </Button>
      </div>
    </section>
  );
}
