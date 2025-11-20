import { useCart } from "../../context/CartContext";
import Button from "../../ui/Button";
import { formatPrice } from "../../utils/helpers";

/**
 * CartFooter component
 * --------------------
 * Summary section at the bottom of the cart:
 * - Shows total price (with discount if applicable)
 * - Displays original price struck-through when discounted
 * - "Confirm Order" button navigates to order page
 */
export default function CartFooter() {
  const { totalFinalPrice, hasDiscount, totalOriginalPrice } = useCart();

  return (
    <div className="border-t border-t-gold-darker/30 rounded-b-xl bg-gray-950/95 backdrop-blur-sm px-5 py-4 mt-auto">
      {/* Total price display */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-100 text-sm font-medium">Total Price</p>
        {hasDiscount ? (
          <div className="flex flex-col">
            {/* Original price when discounted */}
            <p className="line-through text-gray-400 text-sm">
              {formatPrice(totalOriginalPrice)}
            </p>
            {/* Final discounted price */}
            <p className="text-xl font-bold text-gold">
              {formatPrice(totalFinalPrice)}
            </p>
          </div>
        ) : (
          <p className="text-xl font-bold">{formatPrice(totalFinalPrice)}</p>
        )}
      </div>

      {/* Confirm order button */}
      <Button to="/order" className="block w-full text-center">
        Confirm Order
      </Button>
    </div>
  );
}
