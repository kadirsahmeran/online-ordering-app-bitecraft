import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";

/**
 * CheckMinAmount component
 * - Displays a warning if the total cart value is below the minimum amount
 * - Pulls `checkMinAmount` and `minimumAmount` from CartContext
 */
export default function CheckMinAmount() {
  const { checkMinAmount, minimumAmount, totalFinalPrice } = useCart();
  const amountAdded = minimumAmount - totalFinalPrice;

  if (!checkMinAmount) return null; // Minimum not reached, render nothing

  return (
    <div className="border border-red-400/40 bg-red-400/20 p-4 rounded-xl text-red-100 text-center">
      <p className="mb-3">
        There must be a minimum of{" "}
        <span className="font-bold text-red-200">${minimumAmount}</span> worth
        of products in the cart!
      </p>
      <p>
        You must add a minimum of{" "}
        <span className="font-bold text-red-200 ">
          {formatPrice(amountAdded)}
        </span>{" "}
        worth of products
      </p>
    </div>
  );
}
