/**
 * Component: OrderInvoince
 * Description:
 *  - Displays full invoice details after order confirmation.
 *  - Shows customer information (name, phone, address, message).
 *  - Shows detailed order summary using OrderPriceDetails component.
 *  - Wrapped inside OrderContainer for consistent UI layout.
 *
 * Props:
 *  - orderData (object): Contains customer info and order pricing data.
 *
 * Used in:
 *  - OrderConfirmation page
 */

import OrderContainer from "../../ui/OrderContainer";
import OrderPriceDetails from "../../ui/OrderPriceDetails";

export default function OrderInvoince({ orderData }) {
  // Destructure customer + order details from API response
  const {
    first_name,
    last_name,
    phone,
    address,
    message,
    orders,
    total_final_price,
    total_original_price,
    has_discount,
    total_discount,
    total_items,
  } = orderData;

  /**
   * Prepare data object for OrderPriceDetails component.
   * API field names → convert them to component's expected prop names.
   */
  const invoiceDetails = {
    orders,
    totalOriginalPrice: total_original_price,
    totalDiscount: total_discount,
    hasDiscount: has_discount,
    totalFinalPrice: total_final_price,
    totalItems: total_items,
  };

  return (
    <OrderContainer className="max-w-3xl mx-auto">
      {/* ----------------- Customer Information Section ----------------- */}
      <div className="border-b border-b-gold-darker/60">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gold">
          Customer Information
        </h3>

        {/* Customer personal and contact info */}
        <div className="flex flex-col gap-4 sm:text-lg text-base mb-6">
          <p>
            {first_name} {last_name}
          </p>
          <p>{phone}</p>
          <p>{address}</p>

          {/* Show message only if customer provided one */}
          {message && <p>{message}</p>}
        </div>
      </div>

      {/* ----------------- Order Summary Section ----------------- */}
      <div className="mt-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-5 text-gold">
          Order Summary
        </h3>

        <div>
          {/* Price breakdown (subtotal, discount, final total, items) */}
          <OrderPriceDetails {...invoiceDetails} />
        </div>
      </div>
    </OrderContainer>
  );
}
