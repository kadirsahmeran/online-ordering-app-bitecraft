import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import CartFooter from "./CartFooter";
import CheckMinAmount from "../../ui/CheckMinAmount";

// Mini cart component for desktop (or mobile if mode="mobile")
// - Shows cart items, or empty state if no items
// - Includes footer with totals and actions
export default function MiniCartDesktop({ mode = "desktop" }) {
  const { cartItems } = useCart();
  const isMobile = mode === "mobile";

  return (
    <div
      className={`${
        isMobile
          ? "bg-gray-950 rounded-xl border border-gold-darker/60 text-gray-100 flex flex-col shadow-lg w-full  min-h-[500px] max-h-full"
          : "sticky filter-aware-sticky bg-gray-950 rounded-xl lg:flex hidden lg:w-[30%] border border-gold-darker/60 text-gray-100 min-h-[500px] max-h-[500px] flex-col shadow-lg"
      }`}
    >
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 scrollbar-custom">
        {cartItems.length === 0 ? (
          <CartEmpty /> // Show empty cart state
        ) : (
          <div className="space-y-4 pb-4">
            <h3 className="text-xl text-gold font-semibold mb-2">Products</h3>
            <div className="space-y-3">
              <CheckMinAmount /> {/* Check minimum order amount */}
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} /> // Display each cart item
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer with totals and checkout button */}
      {cartItems.length > 0 && <CartFooter />}
    </div>
  );
}
