import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/helpers";

/**
 * CartItem component
 * ------------------
 * Displays a single product in the cart with:
 * - Product image and name
 * - Total price for the quantity
 * - Quantity controls (increase, decrease, remove)
 *
 * The quantity buttons dispatch actions to the cart context to update
 * the global cart state. If quantity reaches 1, the decrease button
 * becomes a trash icon to remove the item completely.
 */
export default function CartItem({ item }) {
  const { dispatch } = useCart();
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-900/50 border border-gold-darker/20 rounded-xl hover:bg-gray-900/70 transition-colors">
      <img
        src={item.image_url}
        alt={item.name}
        width={70}
        height={70}
        loading="lazy"
        className="rounded-lg object-cover w-[70px] h-[70px]"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-200 truncate">{item.name}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-gold font-medium">
            {formatPrice(item.discounted_price * item.quantity)}
          </p>
          <div className="flex items-center gap-2 bg-gray-800 rounded-full px-2 py-1">
            <button
              onClick={() =>
                dispatch({ type: "INCREASE_QUANTITY", payload: item.id })
              }
              className="text-gold hover:text-gold-light transition-colors cursor-pointer"
            >
              <PlusCircle size={24} />
            </button>
            <span className="w-6 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "DECREASE_QUANTITY", payload: item.id })
              }
              className="text-gold hover:text-gold-light transition-colors cursor-pointer"
            >
              {item.quantity === 1 ? (
                <Trash size={24} />
              ) : (
                <MinusCircle size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
