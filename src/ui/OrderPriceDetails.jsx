/**
 * Component: OrderPriceDetails
 * Description:
 *  - Displays detailed price breakdown for the user's cart.
 *
 * Props:
 *  - orders (Array): Cart item list.
 *  - totalOriginalPrice (number): Sum of item prices without discount.
 *  - totalFinalPrice (number): Final payable amount after discount.
 *  - totalDiscount (number): Total discount applied to all products.
 *  - hasDiscount (boolean): Indicates whether any discount exists.
 *  - totalItems (number): Total quantity of all items.
 */
import { formatPrice } from "../utils/helpers";

export default function OrderPriceDetails({
  orders,
  totalOriginalPrice,
  totalFinalPrice,
  totalDiscount,
  hasDiscount,
  totalItems,
}) {
  return (
    <div className="flex flex-col">
      {/* Scrollable area for listing cart items */}
      <div className="overflow-y-auto scrollbar-custom max-h-[450px] pr-2">
        {/* Cart items list */}
        <div className="flex flex-col gap-3 pb-8 pt-3 text-gray-200 text-sm border-b border-b-gold-darker/60">
          {orders?.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-center justify-between gap-3"
            >
              <div>
                {item.quantity} x {item.name}
              </div>
              {/* Item total price (after discount if exists) */}
              <div>
                {formatPrice(
                  (item.discounted_price || item.price) * item.quantity
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary section: subtotal, total items, discount */}
        <div className="py-8 text-gray-200 flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between">
            <p>Subtotal</p>
            <p>{formatPrice(totalOriginalPrice)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Total Product</p>
            <p>{totalItems}</p>
          </div>

          {/* Discount amount, shown only if discount exists */}
          {hasDiscount && (
            <div className="flex items-center justify-between">
              <p>Discount</p>
              <p className="text-red-400">- {formatPrice(totalDiscount)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Final price section */}
      <div className="pt-8 text-gray-100 text-xl sm:text-2xl font-medium flex items-center justify-between border-t border-t-gold-darker/60">
        <p className="text-gold">Total Price</p>

        {/* If discount exists, show original price + final discounted price */}
        {hasDiscount ? (
          <div className="flex flex-col items-end">
            <p className="line-through text-sm text-gray-400">
              {formatPrice(totalOriginalPrice)}
            </p>
            <p className="text-2xl font-bold text-gold">
              {formatPrice(totalFinalPrice)}
            </p>
          </div>
        ) : (
          <p className="text-2xl font-bold text-gold">
            {formatPrice(totalFinalPrice)}
          </p>
        )}
      </div>
    </div>
  );
}
